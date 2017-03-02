export default function delay<T>(ms: number, result?: T): Promise<T> {
    return new Promise((resolve, reject) => setTimeout(resolve, ms, result));
}

export function delayReject(ms: number, error?) {
    return new Promise((resolve, reject) => setTimeout(reject, ms, error));
}

// Helper functions for then and catch. It's inspired by https://github.com/sindresorhus/delay.

export function delayThen(ms: number) {
    return result => delay(ms, result);
}

export function delayCatch(ms: number) {
    return error => delayReject(ms, error);
}