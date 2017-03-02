import delay, { delayReject, delayThen, delayCatch } from './delay';

delay(3 * 1000, 'some value').then(v => {
    // Executed in 3 seconds
    console.log(v);
});

delayReject(2 * 1000, 'some error').catch(e => {
    // Executed in 2 seconds
    console.error(e);
});

Promise.resolve('some value').then(delayThen(1000)).then(v => {
    // Executed in a second.
    // The result of the previous promise is passed through
    console.log(v);
});

Promise.reject('some error').catch(delayCatch(1000)).catch(e => {
    // Executed in a second.
    // The error of the previous promise is passed through
    console.log(e);
});