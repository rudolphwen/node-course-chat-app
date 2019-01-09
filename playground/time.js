const moment = require('moment');

// Jan 1st 1970 00:00:00 am

// new Date().getTime()

// let date = new Date();
// let months = ['Jan', 'Feb']
// console.log(date.getMonth());

// let date = moment();
// date.add(2, 'years').subtract(6, 'months');
// // console.log(date.format());
// // console.log(date.format('MMM YYYY'));
// console.log(date.format('MMM Do, YYYY'));

// 10:35 am
// 6:01 am

// new Date().getTime()
let someTimestamp = moment().valueOf();
console.log(someTimestamp);

let createdAt = 1234;
let date = moment(createdAt);
console.log(date.format('h:mm a'));