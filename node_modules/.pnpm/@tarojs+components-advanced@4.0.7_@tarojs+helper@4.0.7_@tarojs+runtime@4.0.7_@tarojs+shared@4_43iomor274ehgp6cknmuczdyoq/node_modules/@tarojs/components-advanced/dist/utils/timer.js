import { cancelAnimationFrame, now, requestAnimationFrame } from '@tarojs/runtime';

function cancelTimeout(timeoutID) {
    cancelAnimationFrame(timeoutID.id);
}
function requestTimeout(callback, delay = 0) {
    const start = now();
    const timeoutID = {
        id: requestAnimationFrame(tick)
    };
    function tick() {
        if (now() - start >= delay) {
            // eslint-disable-next-line no-useless-call
            callback.call(null);
        }
        else {
            timeoutID.id = requestAnimationFrame(tick);
        }
    }
    return timeoutID;
}

export { cancelTimeout, requestTimeout };
//# sourceMappingURL=timer.js.map
