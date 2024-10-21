import { createSelectorQuery, getCurrentInstance, createIntersectionObserver } from '@tarojs/taro';
import memoizeOne from 'memoize-one';
import '../../utils/index.js';
import ListSet from './list-set.js';
import { isHorizontalFunc, isRtlFunc } from './utils.js';
import { convertNumber2PX } from '../../utils/convert.js';
import { getRectSizeSync } from '../../utils/dom.js';
import { isCosDistributing } from '../../utils/math.js';
import { throttle } from '../../utils/lodash.js';

let INSTANCE_ID = 0;
class Preset {
    constructor(props, refresh) {
        this.props = props;
        this.refresh = refresh;
        this._observer = {};
        this.wrapperField = {
            scrollLeft: 0,
            scrollTop: 0,
            scrollHeight: 0,
            scrollWidth: 0,
            clientHeight: 0,
            clientWidth: 0,
            diffOffset: 0
        };
        this.diffList = [0, 0, 0];
        this.getItemStyleCache = memoizeOne((itemIndex, itemSize, _flag = this.itemList.refreshCounter) => {
            itemSize = itemSize || this.itemList.getSize(itemIndex);
            const style = this.isRelative ? {} : {
                position: 'absolute',
            };
            const offset = convertNumber2PX(this.itemList.getOffsetSizeCache(itemIndex));
            const size = convertNumber2PX(this.itemList.getSize(itemIndex));
            const isHorizontal = this.isHorizontal;
            const isRtl = this.isRtl;
            style.height = !isHorizontal ? size : '100%';
            style.width = isHorizontal ? size : '100%';
            if (!this.isRelative) {
                const offsetHorizontal = isHorizontal ? offset : 0;
                style.top = !isHorizontal ? offset : 0;
                if (isRtl) {
                    style.right = offsetHorizontal;
                }
                else {
                    style.left = offsetHorizontal;
                }
            }
            return style;
        });
        this.init(this.props);
        this.itemList = new ListSet(props, refresh);
    }
    init(props) {
        this.props = props;
    }
    update(props) {
        this.props = props;
        this.itemList.update(props);
    }
    async updateWrapper(id) {
        var _a;
        var _b, _c;
        this.id = id;
        const { width = 0, height = 0 } = this.props;
        const validWidth = typeof width === 'number' && width > 0;
        const validHeight = typeof height === 'number' && height > 0;
        if (validWidth) {
            this.itemList.wrapperWidth = width;
        }
        if (validHeight) {
            this.itemList.wrapperHeight = height;
        }
        if (!validHeight || !validWidth) {
            const res = await getRectSizeSync(`#${id}`, 100);
            (_b = this.itemList).wrapperWidth || (_b.wrapperWidth = res.width);
            (_c = this.itemList).wrapperHeight || (_c.wrapperHeight = res.height);
            (_a = this.refresh) === null || _a === void 0 ? void 0 : _a.call(this);
        }
        this.itemList.update(this.props);
    }
    set id(id) {
        this._id = id;
    }
    get id() {
        this._id || (this._id = `virtual-waterfall-${INSTANCE_ID++}`);
        return this._id;
    }
    get isHorizontal() {
        return isHorizontalFunc(this.props);
    }
    get isRtl() {
        return isRtlFunc(this.props);
    }
    get isRelative() {
        return this.props.position && this.props.position !== 'absolute';
    }
    get isBrick() {
        return this.props.position === 'brick';
    }
    get placeholderCount() {
        return this.props.placeholderCount >= 0 ? this.props.placeholderCount : this.props.overscanCount;
    }
    get outerElement() {
        return this.props.outerElementType || this.props.outerTagName || 'div';
    }
    get innerElement() {
        return this.props.innerElementType || this.props.innerTagName || 'div';
    }
    get itemElement() {
        return this.props.itemElementType || this.props.itemTagName || 'div';
    }
    get field() {
        return this.wrapperField;
    }
    set field(o) {
        Object.assign(this.wrapperField, o);
        // Object.keys(o).forEach(key => {
        //   if (typeof o[key] === 'number' && typeof this.wrapperField[key] === 'number') {
        //     this.wrapperField[key] = o[key]
        //   }
        // })
    }
    get enhanced() {
        return this.props.enhanced || true;
    }
    isShaking(diff) {
        if (process.env.TARO_PLATFORM === 'web' || this.props.enhanced)
            return false;
        const list = this.diffList.slice(-3);
        this.diffList.push(diff);
        return list.findIndex(e => Math.abs(e) === Math.abs(diff)) !== -1 || isCosDistributing(this.diffList.slice(-4));
    }
    resetCache() {
        this.itemList.refreshCounter++;
    }
    getItemStyle(index) {
        const { shouldResetStyleCacheOnItemSizeChange } = this.props;
        return this.getItemStyleCache(index, shouldResetStyleCacheOnItemSizeChange ? this.itemList.getSize(index) : false);
    }
    boundaryDetection() {
        if ([typeof this.props.onScrollToUpper, typeof this.props.onScrollToLower].every(e => e !== 'function'))
            return;
        createSelectorQuery().select(`#${this.id}`).node().exec(() => {
            const upperObserver = this.boundaryDetectionHelper({
                event: typeof this.props.onScrollToUpper === 'function' ? () => {
                    if (this.field.diffOffset >= 0)
                        this.props.onScrollToUpper();
                } : undefined,
                id: `${this.id}-${this.isHorizontal ? this.isRtl ? 'right' : 'left' : 'top'}`,
            });
            if (upperObserver) {
                this._observer.top = upperObserver;
            }
            const lowerObserver = this.boundaryDetectionHelper({
                event: typeof this.props.onScrollToLower === 'function' ? () => {
                    if (this.field.diffOffset <= 0)
                        this.props.onScrollToLower();
                } : undefined,
                id: `${this.id}-${this.isHorizontal ? this.isRtl ? 'left' : 'right' : 'bottom'}`,
            });
            if (lowerObserver) {
                this._observer.bottom = lowerObserver;
            }
        });
    }
    boundaryDetectionHelper({ component, event, id, }) {
        if (typeof event !== 'function')
            return;
        const eventFunc = throttle(event);
        component || (component = getCurrentInstance().page);
        const observer = createIntersectionObserver(component, {
            thresholds: [0.4],
        });
        observer
            .relativeTo(`#${this.id}`, {
            top: typeof this.props.lowerThreshold === 'number' ? this.props.lowerThreshold : 50,
            bottom: typeof this.props.upperThreshold === 'number' ? this.props.upperThreshold : 50,
        })
            .observe(`#${id}`, eventFunc);
        return observer;
    }
    dispose() {
        Object.values(this._observer).forEach(e => { var _a; return (_a = e.disconnect) === null || _a === void 0 ? void 0 : _a.call(e); });
        this._observer = {};
    }
}

export { Preset as default };
//# sourceMappingURL=preset.js.map
