var moment = require('moment');
var now =moment();

console.log(now.valueOf());

// console.log(now.format());
// console.log(now.format('h:mm'));

var timestamp=1642511467889;
var timestampMoment=moment.utc(timestamp);
console.log(timestampMoment.local().format('h:mm a'));