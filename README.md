# Fusebox
[![Version][npm-image]][npm-url] ![Downloads][downloads-image] [![Build Status][wercker-image]][wercker-url] [![Open Issues][issues-image]][issues-url] [![Dependency Status][daviddm-image]][daviddm-url] ![License][license-image]

> Wrapper around node-circuitbreaker to define a callback interface

## Usage

```bash
npm install screwdriver-circuit-breaker
```

This module wraps the [node-circuitbreaker] and provides a simple callback interface for handling the circuit breaker.

```js
const Breaker = require('circuit-breaker-cb');
const request = require('request');
const command = request.get
// To setup the fuse, instantiate a new Breaker with the
// command the run
const breaker = new Breaker(command);

breaker.runCommand('http://yahoo.com', (err, data) => {
    if (err) {
        /* If the circuit is open the command is not run, and an error
         * with message "CircuitBreaker Open" is returned.
         * In this case, you can switch on the error and have a fallback technique
         */
        // ... stuff
    }
    // Here there is no error and it's possible to proceed with the resp object
});

```

**note** The function signature of the callback passed to command is `callback(err, data)`. Extra parameters passed to the callback are ignored

### Constructor
`constructor(command, options)` 

| Parameter        | Type  | Required  |  Description | Default |
| :-------------   | :---- | :---- | :-------------| :---------- |
| command        | Function | Yes | The command to run with circuit breaker | none |
| options.timeout | Number | No | The timeout in ms to wait for a command | 10000 |
| options.maxFailures | Number | No | The number of failures before the breaker switches |  5  |
| options.resetTimeout | Number | No | The number in ms to wait before resetting the circuit |  50 |

### Run Command
To run the command passed to the constructor

`runCommand(...args, callback)`

| Parameter        | Type  | Required  |  Description |
| :-------------   | :---- | :---- | :-------------|
| args        | Arguments | No | The arguments to pass to the command |
| callback | Function | Yes | The callback to call when the command returns |

### Get Total Number Requests
Returns the total number of requests from the circuit breaker

`getTotalRequests()`

### Get Total Number Request Timeouts
Returns the total number of request timeouts that occurred

`getTimeouts`

### Get Total Number Request Successful
Returns the total number of successful requests that occurred

`getSuccessfulRequests()`

### Get Total Number Request Failed
Returns the total number of failed requests that occurred

`getFailedRequests()`

### Get Total Concurrent Requests
Returns the total number of concurrent requests that occurred

`getConcurrentRequests()`

### Get Average Request time
Returns the average request time taken

`getAverageRequestTime()`

## Testing

```bash
npm test
```

## License

Code licensed under the BSD 3-Clause license. See LICENSE file for terms.

[npm-image]: https://img.shields.io/npm/v/fusebox.svg
[npm-url]: https://npmjs.org/package/fusebox
[downloads-image]: https://img.shields.io/npm/dt/fusebox.svg
[license-image]: https://img.shields.io/npm/l/fusebox.svg
[issues-image]: https://img.shields.io/github/issues/screwdriver-cd/fusebox.svg
[issues-url]: https://github.com/screwdriver-cd/fusebox/issues
[wercker-image]: https://app.wercker.com/status/4ce8f9228a49a8f5b3749d832ce01bf5
[wercker-url]: https://app.wercker.com/project/bykey/4ce8f9228a49a8f5b3749d832ce01bf5
[daviddm-image]: https://david-dm.org/screwdriver-cd/fusebox.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/screwdriver-cd/fusebox
[node-circuitbreaker]: https://github.com/ryanfitz/node-circuitbreaker
