import { EMPTY_OBJ, hooks, isUndefined } from '@tarojs/shared';
import { CURRENT_TARGET, TARGET, TYPE, TIME_STAMP, CONFIRM, INPUT, KEY_CODE, TOUCHMOVE, EVENT_CALLBACK_RESULT } from '../constants/index.js';
import env from '../env.js';
import { isParentBinded } from '../utils/index.js';

// Taro 事件对象。以 Web 标准的事件对象为基础，加入小程序事件对象中携带的部分信息，并模拟实现事件冒泡。
class TaroEvent {
    constructor(type, opts, event) {
        this._stop = false;
        this._end = false;
        this.defaultPrevented = false;
        // Mouse Event botton property, it's used in 3rd lib, like react-router. default 0 in general
        this.button = 0;
        // timestamp can either be hi-res ( relative to page load) or low-res (relative to UNIX epoch)
        // here use hi-res timestamp
        this.timeStamp = Date.now();
        this.type = type.toLowerCase();
        this.mpEvent = event;
        this.bubbles = Boolean(opts && opts.bubbles);
        this.cancelable = Boolean(opts && opts.cancelable);
    }
    stopPropagation() {
        this._stop = true;
    }
    stopImmediatePropagation() {
        this._end = this._stop = true;
    }
    preventDefault() {
        this.defaultPrevented = true;
    }
    get target() {
        var _a, _b, _c, _d, _e;
        const cacheTarget = this.cacheTarget;
        if (!cacheTarget) {
            const target = Object.create(((_a = this.mpEvent) === null || _a === void 0 ? void 0 : _a.target) || null);
            const currentEle = env.document.getElementById(((_b = target.dataset) === null || _b === void 0 ? void 0 : _b.sid) || target.id || null);
            // Note：优先判断冒泡场景alipay的targetDataset的sid, 不然冒泡场景target属性吐出不对，其余拿取当前绑定id
            const element = env.document.getElementById(((_c = target.targetDataset) === null || _c === void 0 ? void 0 : _c.sid) || ((_d = target.dataset) === null || _d === void 0 ? void 0 : _d.sid) || target.id || null);
            target.dataset = Object.assign(Object.assign({}, (currentEle !== null ? currentEle.dataset : EMPTY_OBJ)), (element !== null ? element.dataset : EMPTY_OBJ));
            for (const key in (_e = this.mpEvent) === null || _e === void 0 ? void 0 : _e.detail) {
                target[key] = this.mpEvent.detail[key];
            }
            this.cacheTarget = target;
            return target;
        }
        else {
            return cacheTarget;
        }
    }
    get currentTarget() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const cacheCurrentTarget = this.cacheCurrentTarget;
        if (!cacheCurrentTarget) {
            const doc = env.document;
            const currentTarget = Object.create(((_a = this.mpEvent) === null || _a === void 0 ? void 0 : _a.currentTarget) || null);
            const element = doc.getElementById(((_b = currentTarget.dataset) === null || _b === void 0 ? void 0 : _b.sid) || currentTarget.id || null);
            const targetElement = doc.getElementById(((_e = (_d = (_c = this.mpEvent) === null || _c === void 0 ? void 0 : _c.target) === null || _d === void 0 ? void 0 : _d.dataset) === null || _e === void 0 ? void 0 : _e.sid) || ((_g = (_f = this.mpEvent) === null || _f === void 0 ? void 0 : _f.target) === null || _g === void 0 ? void 0 : _g.id) || null);
            if (element === null || (element && element === targetElement)) {
                this.cacheCurrentTarget = this.target;
                return this.target;
            }
            currentTarget.dataset = element.dataset;
            for (const key in (_h = this.mpEvent) === null || _h === void 0 ? void 0 : _h.detail) {
                currentTarget[key] = this.mpEvent.detail[key];
            }
            this.cacheCurrentTarget = currentTarget;
            return currentTarget;
        }
        else {
            return cacheCurrentTarget;
        }
    }
}
function createEvent(event, node) {
    if (typeof event === 'string') {
        // For Vue3 using document.createEvent
        return new TaroEvent(event, { bubbles: true, cancelable: true });
    }
    const domEv = new TaroEvent(event.type, { bubbles: true, cancelable: true }, event);
    for (const key in event) {
        if (key === CURRENT_TARGET || key === TARGET || key === TYPE || key === TIME_STAMP) {
            continue;
        }
        else {
            domEv[key] = event[key];
        }
    }
    if (domEv.type === CONFIRM && (node === null || node === void 0 ? void 0 : node.nodeName) === INPUT) {
        // eslint-disable-next-line dot-notation
        domEv[KEY_CODE] = 13;
    }
    return domEv;
}
const eventsBatch = {};
function getEventCBResult(event) {
    const result = event[EVENT_CALLBACK_RESULT];
    if (!isUndefined(result)) {
        delete event[EVENT_CALLBACK_RESULT];
    }
    return result;
}
// 小程序的事件代理回调函数
function eventHandler(event) {
    var _a, _b;
    // Note: ohos 上事件没有设置 type、detail 类型 setter 方法，且部分事件（例如 load 等）缺失 target 导致事件错误
    event.type === undefined && Object.defineProperty(event, 'type', {
        value: event._type // ohos only
    });
    event.detail === undefined && Object.defineProperty(event, 'detail', {
        value: event._detail || Object.assign({}, event) // ohos only
    });
    event.currentTarget = event.currentTarget || event.target || Object.assign({}, event);
    hooks.call('modifyMpEventImpl', event);
    const currentTarget = event.currentTarget;
    const id = ((_a = currentTarget.dataset) === null || _a === void 0 ? void 0 : _a.sid /** sid */) || currentTarget.id /** uid */ || ((_b = event.detail) === null || _b === void 0 ? void 0 : _b.id) || '';
    const node = env.document.getElementById(id);
    if (node) {
        const dispatch = () => {
            const e = createEvent(event, node);
            hooks.call('modifyTaroEvent', e, node);
            hooks.call('dispatchTaroEvent', e, node);
            hooks.call('dispatchTaroEventFinish', e, node);
        };
        if (hooks.isExist('batchedEventUpdates')) {
            const type = event.type;
            if (!hooks.call('isBubbleEvents', type) ||
                !isParentBinded(node, type) ||
                (type === TOUCHMOVE && !!node.props.catchMove)) {
                // 最上层组件统一 batchUpdate
                hooks.call('batchedEventUpdates', () => {
                    if (eventsBatch[type]) {
                        eventsBatch[type].forEach(fn => fn());
                        delete eventsBatch[type];
                    }
                    dispatch();
                });
                return getEventCBResult(event);
            }
            else {
                // 如果上层组件也有绑定同类型的组件，委托给上层组件调用事件回调
                (eventsBatch[type] || (eventsBatch[type] = [])).push(dispatch);
            }
        }
        else {
            dispatch();
            return getEventCBResult(event);
        }
    }
}

export { TaroEvent, createEvent, eventHandler };
//# sourceMappingURL=event.js.map
