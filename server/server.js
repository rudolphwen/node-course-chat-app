const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
let app = express();
// let server = http.createServer((req, res) => {

// });
let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();

// console.log(__dirname + '/../public');
// console.log(publicPath);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    // socket.emit('newEmail');
    // socket.emit('newEmail', {
    //     from: 'mike@example.com',
    //     text: 'Hey. What is going on?',
    //     createAt: 123
    // });

    // socket.emit('newMessage', {
    //     from: 'John',
    //     text: 'See you then',
    //     createdAt: 123123
    // });

    // socket.on('createEmail', (newEmail) => {
    //     console.log('createEmail', newEmail);
    // });

    // socket.emit from Admin text Welcome to the chat app
    // socket.emit('newMessage', {
    //     from: 'Admin',
    //     text: 'Welcome to the chat app',
    //     createdAt: new Date().getTime()
    // });
    // socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    // socket.broadcast.emit from Admin text New user joined
    // socket.broadcast.emit('newMessage', {
    //     from: 'Admin',
    //     text: 'New user joined',
    //     createdAt: new Date().getTime()
    // });
    // socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required.');
        }

        socket.join(params.room);
        // socket.leave('The Office Fans');
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        // io.emit()    -> io.to('The Office Fans').emit
        // socket.broadcast.emit()  -> socket.broadcast.to('The Office Fans').emit
        // socket.emit()

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));

        callback();
    });

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);

        // io.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
        io.emit('newMessage', generateMessage(message.from, message.text));
        // callback('This is from the server.');
        callback();

        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('createLocationMessage', (coords) => {
        // io.emit('newMessage', generateMessage('Admin', `${coords.latitude}, ${coords.longitude}`))
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
        let user = users.removeUser(socket.id);

        if(user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
        }
    });
});

// app.listen(port, () => {
server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});