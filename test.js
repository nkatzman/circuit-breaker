'use strict';

const Breaker = require('./index');

const command = function (id, bd, callback) {
    let foo = id + bd;
    if (foo < 0) {
        return callback(new Error('error loading data ' + foo));
    } else {
        return callback(null, 'data for id ' + foo);
    }
};

let breaker = new Breaker(command);
for ( let i = 0; i < 10; i ++) {
    breaker.run(-11, 10, (err, data) => {
        console.log(err, data);
    });
}

setTimeout(() => {
    console.log('!!!!');
    let invert = -1;
    for (let i = 1; i < 10; i++) {
        invert *= -1;
        breaker.run(0, i * invert, (err, data) => console.log(err, data));
    }
}, 30)
