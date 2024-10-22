import { Events, isString } from '@tarojs/shared';
import { CONTEXT_ACTIONS } from '../constants/index.js';
import '../emitter/emitter.js';
import env from '../env.js';
import { taroGetComputedStyleProvider } from './getComputedStyle.js';
import { History } from './history.js';
import { Location } from './location.js';
import { nav } from './navigator.js';
import { raf as _raf, caf as _caf } from './raf.js';

class TaroWindow extends Events {
    constructor() {
        super();
        this.navigator = nav;
        this.requestAnimationFrame = _raf;
        this.cancelAnimationFrame = _caf;
        this.getComputedStyle = taroGetComputedStyleProvider;
        const globalProperties = [
            ...Object.getOwnPropertyNames(global || {}),
            ...Object.getOwnPropertySymbols(global || {})
        ];
        globalProperties.forEach(property => {
            if (property === 'atob' || property === 'document')
                return;
            if (!Object.prototype.hasOwnProperty.call(this, property)) {
                // 防止小程序环境下，window 上的某些 get 属性在赋值时报错
                try {
                    this[property] = global[property];
                }
                catch (e) {
                    if (process.env.NODE_ENV !== 'production') {
                        console.warn(`[Taro warn] window.${String(property)} 在赋值到 window 时报错`);
                    }
                }
            }
        });
        this.Date || (this.Date = Date);
        // 应用启动时，提供给需要读取历史信息的库使用
        this.location = new Location({ window: this });
        // @ts-ignore
        this.history = new History(this.location, { window: this });
        this.initEvent();
    }
    initEvent() {
        const _location = this.location;
        const _history = this.history;
        this.on(CONTEXT_ACTIONS.INIT, (pageId) => {
            // 页面onload，为该页面建立新的上下文信息
            _location.trigger(CONTEXT_ACTIONS.INIT, pageId);
        }, null);
        this.on(CONTEXT_ACTIONS.RECOVER, (pageId) => {
            // 页面onshow，恢复当前页面的上下文信息
            _location.trigger(CONTEXT_ACTIONS.RECOVER, pageId);
            _history.trigger(CONTEXT_ACTIONS.RECOVER, pageId);
        }, null);
        this.on(CONTEXT_ACTIONS.RESTORE, (pageId) => {
            // 页面onhide，缓存当前页面的上下文信息
            _location.trigger(CONTEXT_ACTIONS.RESTORE, pageId);
            _history.trigger(CONTEXT_ACTIONS.RESTORE, pageId);
        }, null);
        this.on(CONTEXT_ACTIONS.DESTORY, (pageId) => {
            // 页面onunload，清除当前页面的上下文信息
            _location.trigger(CONTEXT_ACTIONS.DESTORY, pageId);
            _history.trigger(CONTEXT_ACTIONS.DESTORY, pageId);
        }, null);
    }
    get document() {
        return env.document;
    }
    addEventListener(event, callback) {
        if (!isString(event))
            return;
        this.on(event, callback, null);
    }
    removeEventListener(event, callback) {
        if (!isString(event))
            return;
        this.off(event, callback, null);
    }
    setTimeout(...args) {
        return setTimeout(...args);
    }
    clearTimeout(...args) {
        return clearTimeout(...args);
    }
}
// Note: 小程序端 vite 打包成 commonjs，const window = xxx 会报错，所以把 window 改为 taroWindowProvider，location 和 history 同理
const taroWindowProvider = process.env.TARO_PLATFORM === 'web' ? env.window : (env.window = new TaroWindow());
const taroLocationProvider = taroWindowProvider.location;
const taroHistoryProvider = taroWindowProvider.history;

export { taroHistoryProvider, taroLocationProvider, taroWindowProvider };
//# sourceMappingURL=window.js.map
