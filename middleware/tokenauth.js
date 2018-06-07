/*
var tokenauth;

const uuidv1 = require('uuid/v1');
const v1options = {
    node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
    clockseq: 0x1234,
    msecs: new Date('2018-06-06').getTime(),
    nsecs: 5678
};

uuidv1(v1options);

console.log(uuidv1);
*/

module.exports = {
    tokenAuth: function (req, res, next) {
      console.log('Token Auth called')
      next()
    }
} 