import { __classPrivateFieldGet } from 'tslib';
import { options } from './options.js';
import '@tarojs/shared';
import './constants/index.js';
import { debounce } from './utils/lodash.js';
import './bom/window.js';

var _Performance_instances, _Performance_parseTime;
class Performance {
    constructor() {
        _Performance_instances.add(this);
        this.recorder = new Map();
    }
    start(id) {
        if (!options.debug) {
            return;
        }
        this.recorder.set(id, Date.now());
    }
    stop(id, now = Date.now()) {
        if (!options.debug) {
            return;
        }
        const prev = this.recorder.get(id);
        if (!(prev >= 0))
            return;
        this.recorder.delete(id);
        const time = now - prev;
        // eslint-disable-next-line no-console
        console.log(`${id} 时长： ${time}ms 开始时间：${__classPrivateFieldGet(this, _Performance_instances, "m", _Performance_parseTime).call(this, prev)} 结束时间：${__classPrivateFieldGet(this, _Performance_instances, "m", _Performance_parseTime).call(this, now)}`);
    }
    delayStop(id, delay = 500) {
        if (!options.debug) {
            return;
        }
        return debounce((now = Date.now(), cb) => {
            this.stop(id, now);
            cb === null || cb === void 0 ? void 0 : cb();
        }, delay);
    }
}
_Performance_instances = new WeakSet(), _Performance_parseTime = function _Performance_parseTime(time) {
    const d = new Date(time);
    return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}.${`${d.getMilliseconds()}`.padStart(3, '0')}`;
};
const perf = new Performance();

export { perf };
//# sourceMappingURL=perf.js.map
