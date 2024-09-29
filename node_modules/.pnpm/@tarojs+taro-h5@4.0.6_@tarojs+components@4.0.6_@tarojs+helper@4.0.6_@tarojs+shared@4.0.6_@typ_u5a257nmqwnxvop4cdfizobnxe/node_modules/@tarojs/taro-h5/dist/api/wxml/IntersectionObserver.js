import Taro from '@tarojs/api';
import { findDOM } from '../../utils/index.js';

class TaroH5IntersectionObserver {
    // selector 的容器节点
    get container() {
        const container = (this._component !== null
            ? (findDOM(this._component) || document)
            : document);
        return container;
    }
    constructor(component, options = {}) {
        // 选项
        this._options = {
            thresholds: [0],
            initialRatio: 0,
            observeAll: false
        };
        // 监控中的选择器
        this._listeners = [];
        // 用来扩展（或收缩）参照节点布局区域的边界
        this._rootMargin = {};
        // 是否已初始化
        this._isInited = false;
        this._component = component;
        Object.assign(this._options, options);
    }
    createInst() {
        // 去除原本的实例
        this.disconnect();
        const { left = 0, top = 0, bottom = 0, right = 0 } = this._rootMargin;
        return new IntersectionObserver(entries => {
            entries.forEach(entry => {
                const _callback = this._getCallbackByElement(entry.target);
                const result = {
                    boundingClientRect: entry.boundingClientRect,
                    intersectionRatio: entry.intersectionRatio,
                    intersectionRect: entry.intersectionRect,
                    relativeRect: entry.rootBounds || { left: 0, right: 0, top: 0, bottom: 0 },
                    // 使用时间戳而不是entry.time，跟微信小程序一致
                    time: Date.now(),
                };
                // web端会默认首次触发
                if (!this._isInited && this._options.initialRatio <= Math.min.apply(Math, this._options.thresholds)) {
                    // 初始的相交比例，如果调用时检测到的相交比例与这个值不相等且达到阈值，则会触发一次监听器的回调函数。
                    return;
                }
                _callback && _callback.call(this, result);
            });
            this._isInited = true;
        }, {
            root: this._root,
            rootMargin: [`${top}px`, `${right}px`, `${bottom}px`, `${left}px`].join(' '),
            threshold: this._options.thresholds
        });
    }
    disconnect() {
        if (this._observerInst) {
            let listener;
            while ((listener = this._listeners.pop())) {
                this._observerInst.unobserve(listener.element);
            }
            this._observerInst.disconnect();
        }
    }
    observe(targetSelector, callback) {
        // 同wx小程序效果一致，每个实例监听一个Selector
        if (this._listeners.length)
            return;
        // 监听前没有设置关联的节点
        if (!this._observerInst) {
            console.warn('Intersection observer will be ignored because no relative nodes are found.');
            return;
        }
        const nodeList = this._options.observeAll
            ? this.container.querySelectorAll(targetSelector)
            : [this.container.querySelector(targetSelector)];
        Taro.nextTick(() => {
            nodeList.forEach(element => {
                if (!element)
                    return;
                this._observerInst.observe(element);
                this._listeners.push({ element, callback });
            });
        });
    }
    relativeTo(selector, margins) {
        // 已设置observe监听后，重新关联节点
        if (this._listeners.length) {
            console.error('Relative nodes cannot be added after "observe" call in IntersectionObserver');
            return this;
        }
        this._root = this.container.querySelector(selector) || null;
        if (margins) {
            this._rootMargin = margins;
        }
        this._observerInst = this.createInst();
        return this;
    }
    relativeToViewport(margins) {
        return this.relativeTo('.taro_page', margins);
    }
    _getCallbackByElement(element) {
        const listener = this._listeners.find(listener => listener.element === element);
        return listener ? listener.callback : null;
    }
}

export { TaroH5IntersectionObserver };
//# sourceMappingURL=IntersectionObserver.js.map
