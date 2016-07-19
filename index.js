'use strict';

let circuitbreaker = require('circuitbreaker');

class CircuitBreaker {
    constructor(command) {
        this.command = command;
        this.breaker = circuitbreaker(this.command, {
            timeout: 10,
            maxFailures: 3,
            resetTimeout: 30
        });
    }

    run() {
        let args = Array.prototype.slice.call(arguments);
        let callback = args.pop();

        this.breaker.apply(this.breaker, args).then((data) => {
            callback(null, data);
        }).fail((err) => {
            callback(err);
        });
    }
}

module.exports = CircuitBreaker;
