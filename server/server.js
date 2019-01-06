const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
let app = express();
// let server = http.createServer((req, res) => {

// });
let server = http.createServer(app);
let io = socketIO(server);

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

    socket.emit('newMessage', {
        from: 'John',
        text: 'See you then',
        createdAt: 123123
    });

    // socket.on('createEmail', (newEmail) => {
    //     console.log('createEmail', newEmail);
    // });

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});

// app.listen(port, () => {
server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});