import { __classPrivateFieldSet, __classPrivateFieldGet } from 'tslib';
import { Events, isNumber, isString } from '@tarojs/shared';
import { CONTEXT_ACTIONS } from '../constants/index.js';
import '../emitter/emitter.js';
import env from '../env.js';
import { RuntimeCache } from '../utils/cache.js';

var _TaroHistory_instances, _TaroHistory_location, _TaroHistory_stack, _TaroHistory_cur, _TaroHistory_window, _TaroHistory_reset;
const cache = new RuntimeCache('history');
class TaroHistory extends Events {
    constructor(location, options) {
        super();
        _TaroHistory_instances.add(this);
        /* private property */
        _TaroHistory_location.set(this, void 0);
        _TaroHistory_stack.set(this, []);
        _TaroHistory_cur.set(this, 0);
        _TaroHistory_window.set(this, void 0);
        __classPrivateFieldSet(this, _TaroHistory_window, options.window, "f");
        __classPrivateFieldSet(this, _TaroHistory_location, location, "f");
        __classPrivateFieldGet(this, _TaroHistory_location, "f").on('__record_history__', (href) => {
            var _a;
            __classPrivateFieldSet(this, _TaroHistory_cur, (_a = __classPrivateFieldGet(this, _TaroHistory_cur, "f"), _a++, _a), "f");
            __classPrivateFieldSet(this, _TaroHistory_stack, __classPrivateFieldGet(this, _TaroHistory_stack, "f").slice(0, __classPrivateFieldGet(this, _TaroHistory_cur, "f")), "f");
            __classPrivateFieldGet(this, _TaroHistory_stack, "f").push({
                state: null,
                title: '',
                url: href
            });
        }, null);
        __classPrivateFieldGet(this, _TaroHistory_location, "f").on('__reset_history__', (href) => {
            __classPrivateFieldGet(this, _TaroHistory_instances, "m", _TaroHistory_reset).call(this, href);
        }, null);
        // 切换上下文行为
        this.on(CONTEXT_ACTIONS.INIT, () => {
            __classPrivateFieldGet(this, _TaroHistory_instances, "m", _TaroHistory_reset).call(this);
        }, null);
        this.on(CONTEXT_ACTIONS.RESTORE, (pageId) => {
            cache.set(pageId, {
                location: __classPrivateFieldGet(this, _TaroHistory_location, "f"),
                stack: __classPrivateFieldGet(this, _TaroHistory_stack, "f").slice(),
                cur: __classPrivateFieldGet(this, _TaroHistory_cur, "f")
            });
        }, null);
        this.on(CONTEXT_ACTIONS.RECOVER, (pageId) => {
            if (cache.has(pageId)) {
                const ctx = cache.get(pageId);
                __classPrivateFieldSet(this, _TaroHistory_location, ctx.location, "f");
                __classPrivateFieldSet(this, _TaroHistory_stack, ctx.stack, "f");
                __classPrivateFieldSet(this, _TaroHistory_cur, ctx.cur, "f");
            }
        }, null);
        this.on(CONTEXT_ACTIONS.DESTORY, (pageId) => {
            cache.delete(pageId);
        }, null);
        __classPrivateFieldGet(this, _TaroHistory_instances, "m", _TaroHistory_reset).call(this);
    }
    /* public property */
    get length() {
        return __classPrivateFieldGet(this, _TaroHistory_stack, "f").length;
    }
    get state() {
        return __classPrivateFieldGet(this, _TaroHistory_stack, "f")[__classPrivateFieldGet(this, _TaroHistory_cur, "f")].state;
    }
    /* public method */
    go(delta) {
        if (!isNumber(delta) || isNaN(delta))
            return;
        let targetIdx = __classPrivateFieldGet(this, _TaroHistory_cur, "f") + delta;
        targetIdx = Math.min(Math.max(targetIdx, 0), this.length - 1);
        __classPrivateFieldSet(this, _TaroHistory_cur, targetIdx, "f");
        __classPrivateFieldGet(this, _TaroHistory_location, "f").trigger('__set_href_without_history__', __classPrivateFieldGet(this, _TaroHistory_stack, "f")[__classPrivateFieldGet(this, _TaroHistory_cur, "f")].url);
        __classPrivateFieldGet(this, _TaroHistory_window, "f").trigger('popstate', __classPrivateFieldGet(this, _TaroHistory_stack, "f")[__classPrivateFieldGet(this, _TaroHistory_cur, "f")]);
    }
    back() {
        this.go(-1);
    }
    forward() {
        this.go(1);
    }
    pushState(state, title, url) {
        if (!url || !isString(url))
            return;
        __classPrivateFieldSet(this, _TaroHistory_stack, __classPrivateFieldGet(this, _TaroHistory_stack, "f").slice(0, __classPrivateFieldGet(this, _TaroHistory_cur, "f") + 1), "f");
        __classPrivateFieldGet(this, _TaroHistory_stack, "f").push({
            state,
            title,
            url
        });
        __classPrivateFieldSet(this, _TaroHistory_cur, this.length - 1, "f");
        __classPrivateFieldGet(this, _TaroHistory_location, "f").trigger('__set_href_without_history__', url);
    }
    replaceState(state, title, url) {
        if (!url || !isString(url))
            return;
        __classPrivateFieldGet(this, _TaroHistory_stack, "f")[__classPrivateFieldGet(this, _TaroHistory_cur, "f")] = {
            state,
            title,
            url
        };
        __classPrivateFieldGet(this, _TaroHistory_location, "f").trigger('__set_href_without_history__', url);
    }
    // For debug
    get cache() {
        return cache;
    }
}
_TaroHistory_location = new WeakMap(), _TaroHistory_stack = new WeakMap(), _TaroHistory_cur = new WeakMap(), _TaroHistory_window = new WeakMap(), _TaroHistory_instances = new WeakSet(), _TaroHistory_reset = function _TaroHistory_reset(href = '') {
    __classPrivateFieldSet(this, _TaroHistory_stack, [
        {
            state: null,
            title: '',
            url: href || __classPrivateFieldGet(this, _TaroHistory_location, "f").href
        }
    ], "f");
    __classPrivateFieldSet(this, _TaroHistory_cur, 0, "f");
};
const History = process.env.TARO_PLATFORM === 'web' ? env.window.History : TaroHistory;

export { History };
//# sourceMappingURL=history.js.map
