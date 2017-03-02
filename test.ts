import * as assert from 'assert';
import delay, { delayReject, delayThen, delayCatch } from './delay';

test();

async function test() {
    let delayTime = 3107;
    let value = 12989;
    let error = 'abc-test-error';

    let startTime = Date.now();
    let ret = await delay(delayTime, value);
    assert(Date.now() - startTime > delayTime, 'delay: Wrong timeout');
    assert(ret === value, 'delay: Wrong return value');

    try {
        startTime = Date.now();
        await delayReject(delayTime, error);
        assert(false, 'delayReject should not resolve');
    } catch (e) {
        assert(Date.now() - startTime > delayTime, 'delayReject: Wrong timeout');
        assert(e === error, 'delayReject: Wrong error value');
    }

    await Promise.resolve(value).then(delayThen(delayTime)).then(v => {
        assert(value === v, 'delayFunc: Wrong return value');
    });

    await Promise.reject(error).catch(delayCatch(delayTime)).then(() => {
        assert(false, 'delayRejectFunc should not resolve');
    }, e => {
        assert(error === e, 'delayRejectFunc: Wrong error value');
    });

    console.log('All tests passed.');
}