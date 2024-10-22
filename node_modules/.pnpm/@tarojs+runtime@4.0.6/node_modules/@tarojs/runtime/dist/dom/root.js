import { hooks, isFunction, isArray, isUndefined } from '@tarojs/shared';
import { ROOT_STR, CUSTOM_WRAPPER, SET_DATA, PAGE_INIT } from '../constants/index.js';
import { options } from '../options.js';
import { perf } from '../perf.js';
import { isComment, customWrapperCache } from '../utils/index.js';
import { TaroElement } from './element.js';

function findCustomWrapper(root, dataPathArr) {
    // ['root', 'cn', '[0]'] remove 'root' => ['cn', '[0]']
    const list = dataPathArr.slice(1);
    let currentData = root;
    let customWrapper;
    let splitedPath = '';
    list.some((item, i) => {
        const key = item
            // '[0]' => '0'
            .replace(/^\[(.+)\]$/, '$1')
            // 'cn' => 'childNodes'
            .replace(/\bcn\b/g, 'childNodes');
        currentData = currentData[key];
        if (isArray(currentData)) {
            currentData = currentData.filter(el => !isComment(el));
        }
        if (isUndefined(currentData))
            return true;
        if (currentData.nodeName === CUSTOM_WRAPPER) {
            const res = customWrapperCache.get(currentData.sid);
            if (res) {
                customWrapper = res;
                splitedPath = dataPathArr.slice(i + 2).join('.');
            }
        }
    });
    if (customWrapper) {
        return {
            customWrapper,
            splitedPath
        };
    }
}
class TaroRootElement extends TaroElement {
    constructor() {
        super();
        this.updatePayloads = [];
        this.updateCallbacks = [];
        this.pendingUpdate = false;
        this.ctx = null;
        this.nodeName = ROOT_STR;
        this.tagName = ROOT_STR.toUpperCase();
    }
    get _path() {
        return ROOT_STR;
    }
    get _root() {
        return this;
    }
    enqueueUpdate(payload) {
        this.updatePayloads.push(payload);
        if (!this.pendingUpdate && this.ctx) {
            this.performUpdate();
        }
    }
    performUpdate(initRender = false, prerender) {
        this.pendingUpdate = true;
        const ctx = hooks.call('proxyToRaw', this.ctx);
        setTimeout(() => {
            const setDataMark = `${SET_DATA} 开始时间戳 ${Date.now()}`;
            perf.start(setDataMark);
            const data = Object.create(null);
            const resetPaths = new Set(initRender
                ? ['root.cn.[0]', 'root.cn[0]']
                : []);
            while (this.updatePayloads.length > 0) {
                const { path, value } = this.updatePayloads.shift();
                if (path.endsWith("cn" /* Shortcuts.Childnodes */)) {
                    resetPaths.add(path);
                }
                data[path] = value;
            }
            for (const path in data) {
                resetPaths.forEach(p => {
                    // 已经重置了数组，就不需要分别再设置了
                    if (path.includes(p) && path !== p) {
                        delete data[path];
                    }
                });
                const value = data[path];
                if (isFunction(value)) {
                    data[path] = value();
                }
            }
            // 预渲染
            if (isFunction(prerender))
                return prerender(data);
            // 正常渲染
            this.pendingUpdate = false;
            let normalUpdate = {};
            const customWrapperMap = new Map();
            if (initRender) {
                // 初次渲染，使用页面级别的 setData
                normalUpdate = data;
            }
            else {
                // 更新渲染，区分 CustomWrapper 与页面级别的 setData
                for (const p in data) {
                    const dataPathArr = p.split('.');
                    const found = findCustomWrapper(this, dataPathArr);
                    if (found) {
                        // 此项数据使用 CustomWrapper 去更新
                        const { customWrapper, splitedPath } = found;
                        // 合并同一个 customWrapper 的相关更新到一次 setData 中
                        customWrapperMap.set(customWrapper, Object.assign(Object.assign({}, (customWrapperMap.get(customWrapper) || {})), { [`i.${splitedPath}`]: data[p] }));
                    }
                    else {
                        // 此项数据使用页面去更新
                        normalUpdate[p] = data[p];
                    }
                }
            }
            const customWrapperCount = customWrapperMap.size;
            const isNeedNormalUpdate = Object.keys(normalUpdate).length > 0;
            const updateArrLen = customWrapperCount + (isNeedNormalUpdate ? 1 : 0);
            let executeTime = 0;
            const cb = () => {
                if (++executeTime === updateArrLen) {
                    perf.stop(setDataMark);
                    this.flushUpdateCallback();
                    initRender && perf.stop(PAGE_INIT);
                }
            };
            // custom-wrapper setData
            if (customWrapperCount) {
                customWrapperMap.forEach((data, ctx) => {
                    if (process.env.NODE_ENV !== 'production' && options.debug) {
                        // eslint-disable-next-line no-console
                        console.log('custom wrapper setData: ', data);
                    }
                    ctx.setData(data, cb);
                });
            }
            // page setData
            if (isNeedNormalUpdate) {
                if (process.env.NODE_ENV !== 'production' && options.debug) {
                    // eslint-disable-next-line no-console
                    console.log('page setData:', normalUpdate);
                }
                ctx.setData(normalUpdate, cb);
            }
        }, 0);
    }
    enqueueUpdateCallback(cb, ctx) {
        this.updateCallbacks.push(() => {
            ctx ? cb.call(ctx) : cb();
        });
    }
    flushUpdateCallback() {
        const updateCallbacks = this.updateCallbacks;
        if (!updateCallbacks.length)
            return;
        const copies = updateCallbacks.slice(0);
        this.updateCallbacks.length = 0;
        for (let i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

export { TaroRootElement };
//# sourceMappingURL=root.js.map
