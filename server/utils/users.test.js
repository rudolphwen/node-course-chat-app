const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
    let newUsers;

    beforeEach(() => {
        newUsers = new Users();
        newUsers.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        }, {
            id: '2',
            name: 'Jen',
            room: 'React Course'
        }, {
            id: '3',
            name: 'Julie',
            room: 'Node Course'
        }];
    });

    it('should add new user', () => {
        let roomUsers = new Users();
        let user = {
            id: '123',
            name: 'Andrew',
            room: 'The Office Fans'
        };
        let resUser = roomUsers.addUser(user.id, user.name, user.room);

        expect(roomUsers.users).toEqual([user]);
    });

    it('should remove a user', () => {
        let userId = '1';
        let user = newUsers.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(newUsers.users.length).toBe(2);
    });

    it('should not remove a user', () => {
        let userId = '99';
        let user = newUsers.removeUser(userId);

        expect(user).toBeFalsy();
        expect(newUsers.users.length).toBe(3);
    });

    it('should find user', () => {
        let userId = '2';
        let user = newUsers.getUser(userId);

        expect(user.id).toBe(userId);
    });

    it('should not find user', () => {
        let userId = '99';
        let user = newUsers.getUser(userId);

        expect(user).toBeFalsy();
    });

    it('should return names for node course', () => {
        let userList = newUsers.getUserList('Node Course');

        expect(userList).toEqual(['Mike', 'Julie']);
    });

    it('should return names for react course', () => {
        let userList = newUsers.getUserList('React Course');

        expect(userList).toEqual(['Jen']);
    });
});