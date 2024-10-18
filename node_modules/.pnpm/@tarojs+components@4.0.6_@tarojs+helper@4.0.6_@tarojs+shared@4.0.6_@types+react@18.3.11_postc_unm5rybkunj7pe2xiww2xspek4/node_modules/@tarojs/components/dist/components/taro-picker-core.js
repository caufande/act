import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { c as classnames } from './index2.js';
import { T as TOP, L as LINE_HEIGHT, d as defineCustomElement$2 } from './picker-group.js';

function getTimeRange(begin, end) {
  const range = [];
  for (let i = begin; i <= end; i++) {
    range.push(`${i < 10 ? '0' : ''}${i}`);
  }
  return range;
}
const hoursRange = [
  '20',
  '21',
  '22',
  '23',
  ...getTimeRange(0, 23),
  '00',
  '01',
  '02',
  '03'
];
const minutesRange = [
  '56',
  '57',
  '58',
  '59',
  ...getTimeRange(0, 59),
  '00',
  '01',
  '02',
  '03'
];
/**
 * 校验传入的 value 是否合法
 */
function verifyValue(value, range) {
  if (!isNaN(+value) && value >= 0 && value < range.length)
    return true;
  return false;
}
/**
 * 检验传入的 time value 是否合法
 */
function verifyTime(value) {
  if (!/^\d{1,2}:\d{1,2}$/.test(value))
    return false;
  const time = value.split(':').map(num => +num);
  if (time[0] < 0 || time[0] > 23)
    return false;
  if (time[1] < 0 || time[1] > 59)
    return false;
  return true;
}
/**
 * 比较时间
 * return t1 <= t2
 */
function compareTime(t1, t2) {
  const t1List = t1.split(':').map(i => +i);
  const t2List = t2.split(':').map(i => +i);
  if (t1List[0] < t2List[0])
    return true;
  if (t1List[0] === t2List[0] && t1List[1] <= t2List[1])
    return true;
  return false;
}
/**
 * 校验日期合法性，返回合法性和日期数组
 */
function verifyDate(dateStr) {
  if (!dateStr)
    return false;
  const date = new Date(dateStr.replace(/-/g, '/'));
  return isNaN(date.getMonth()) ? false : date;
}
/**
 * 获取当月最大天数
 */
function getMaxDay(year, month) {
  if (month === 4 || month === 6 || month === 9 || month === 11)
    return 30;
  if (month === 2) {
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)
      return 29;
    else
      return 28;
  }
  return 31;
}
function formatValue(value) {
  let res;
  if (Array.isArray(value)) {
    res = value.map(item => String(item));
  }
  else {
    res = value;
  }
  return res;
}
/**
 * 获取时间数组
 */
function getDateRange(start, end) {
  const range = [];
  for (let i = start; i <= end; i++) {
    range.push(i);
  }
  return range;
}
/**
 * 获取年份区间数组
 */
function getYearRange(start, end) {
  return getDateRange(start, end);
}
/**
 * 获取月份区间数组
 */
function getMonthRange(start, end, year) {
  let rangeStart = 1;
  let rangeEnd = 12;
  // 当前年份等于开始年份，由开始对应的月份约束开始值
  if (start.getFullYear() === year) {
    rangeStart = start.getMonth() + 1;
  }
  // 当前年份等于结束年份，由结束对应的月份约束结束值
  if (end.getFullYear() === year) {
    rangeEnd = end.getMonth() + 1;
  }
  return getDateRange(rangeStart, rangeEnd);
}
/**
 * 获取日期区间数组
 */
function getDayRange(start, end, year, month) {
  let rangeStart = 1;
  let rangeEnd = getMaxDay(year, month);
  if (start.getFullYear() === year && start.getMonth() + 1 === month) {
    rangeStart = start.getDate();
  }
  if (end.getFullYear() === year && end.getMonth() + 1 === month) {
    rangeEnd = end.getDate();
  }
  return getDateRange(rangeStart, rangeEnd);
}

const indexCss = ".weui-mask{z-index:1000;background:rgba(0,0,0,.6);position:fixed;inset:0}.weui-mask_transparent{z-index:1000;position:fixed;inset:0}@-webkit-keyframes weuiSlideUp{0%{-webkit-transform:translateY(100%);transform:translateY(100%)}to{-webkit-transform:translate(0,0);transform:translate(0,0)}}@keyframes weuiSlideUp{0%{-webkit-transform:translateY(100%);transform:translateY(100%)}to{-webkit-transform:translate(0,0);transform:translate(0,0)}}.weui-animate-slide-up{-webkit-animation:.3s forwards weuiSlideUp;animation:.3s forwards weuiSlideUp}@-webkit-keyframes weuiSlideDown{0%{-webkit-transform:translate(0,0);transform:translate(0,0)}to{-webkit-transform:translateY(100%);transform:translateY(100%)}}@keyframes weuiSlideDown{0%{-webkit-transform:translate(0,0);transform:translate(0,0)}to{-webkit-transform:translateY(100%);transform:translateY(100%)}}.weui-animate-slide-down{-webkit-animation:.3s forwards weuiSlideDown;animation:.3s forwards weuiSlideDown}@-webkit-keyframes weuiFadeIn{0%{opacity:0}to{opacity:1}}@keyframes weuiFadeIn{0%{opacity:0}to{opacity:1}}.weui-animate-fade-in{-webkit-animation:.3s forwards weuiFadeIn;animation:.3s forwards weuiFadeIn}@-webkit-keyframes weuiFadeOut{0%{opacity:1}to{opacity:0}}@keyframes weuiFadeOut{0%{opacity:1}to{opacity:0}}.weui-animate-fade-out{-webkit-animation:.3s forwards weuiFadeOut;animation:.3s forwards weuiFadeOut}.weui-picker{-webkit-box-sizing:border-box;box-sizing:border-box;z-index:5000;background-color:var(--weui-BG-2);padding-left:0;padding-left:constant(safe-area-inset-left);padding-left:env(safe-area-inset-left);padding-right:0;padding-right:constant(safe-area-inset-right);padding-right:env(safe-area-inset-right);-webkit-backface-visibility:hidden;backface-visibility:hidden;width:100%;-webkit-transition:-webkit-transform .3s;transition:-webkit-transform .3s;transition:transform .3s;transition:transform .3s, -webkit-transform .3s;position:fixed;bottom:0;left:0;-webkit-transform:translateY(100%);transform:translateY(100%)}.weui-picker__hd{text-align:center;background-color:#fff;padding:9px 15px;font-size:17px;display:-ms-flexbox;display:flex;position:relative}.weui-picker__hd:after{content:\" \";color:#e5e5e5;-webkit-transform-origin:0 100%;transform-origin:0 100%;border-bottom:1px solid #e5e5e5;height:1px;position:absolute;bottom:0;left:0;right:0;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-picker__action{color:#1aad19;-ms-flex:1;flex:1;display:block}.weui-picker__action:first-child{text-align:left;color:#888}.weui-picker__action:last-child{text-align:right}.weui-picker__bd{background-color:#fff;height:238px;display:-ms-flexbox;display:flex;position:relative;overflow:hidden}.weui-picker__group{-ms-flex:1;flex:1;height:100%;position:relative}.weui-picker__mask{z-index:3;background-color:transparent;background-image:-webkit-gradient(linear,left top, left bottom,from(rgba(255,255,255,.95)),to(rgba(255,255,255,.6))),-webkit-gradient(linear,left top, left bottom,from(rgba(255,255,255,.6)),to(rgba(255,255,255,.95)));background-image:linear-gradient(rgba(255,255,255,.95),rgba(255,255,255,.6)),linear-gradient(rgba(255,255,255,.6),rgba(255,255,255,.95));background-position:top,bottom;background-repeat:no-repeat;background-size:100% 102px;background-attachment:scroll,scroll;background-origin:padding-box,padding-box;background-clip:border-box,border-box;width:100%;height:100%;margin:0 auto;position:absolute;top:0;left:0;-webkit-transform:translateZ(0);transform:translateZ(0)}.weui-picker__indicator{z-index:3;width:100%;height:34px;position:absolute;top:102px;left:0}.weui-picker__indicator:before{content:\" \";color:#e5e5e5;-webkit-transform-origin:0 0;transform-origin:0 0;border-top:1px solid #e5e5e5;height:1px;position:absolute;top:0;left:0;right:0;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-picker__indicator:after{content:\" \";color:#e5e5e5;-webkit-transform-origin:0 100%;transform-origin:0 100%;border-bottom:1px solid #e5e5e5;height:1px;position:absolute;bottom:0;left:0;right:0;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-picker__content{width:100%;position:absolute;top:0;left:0}.weui-picker__item{text-align:center;color:#000;text-overflow:ellipsis;white-space:nowrap;height:34px;padding:0;line-height:34px;overflow:hidden}.weui-picker__item_disabled{color:#999}.weui-picker,.weui-picker__hd{font-size:12px}";

const Picker = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.onChange = createEvent(this, "change", 7);
    this.onColumnChange = createEvent(this, "columnchange", 7);
    this.onCancel = createEvent(this, "cancel", 7);
    this.index = [];
    // 展示 Picker
    this.showPicker = () => {
      if (this.disabled)
        return;
      this.height = this.getHeightByIndex();
      this.hidden = false;
    };
    this.getHeightByIndex = () => {
      const height = this.index.map(i => {
        let factor = 0;
        if (this.mode === 'time') {
          factor = LINE_HEIGHT * 4;
        }
        return TOP - LINE_HEIGHT * i - factor;
      });
      return height;
    };
    // 隐藏 picker
    this.hidePicker = () => {
      this.fadeOut = true;
      setTimeout(() => {
        this.hidden = true;
        this.fadeOut = false;
      }, 350);
    };
    // 点击确定按钮
    this.handleChange = () => {
      this.hidePicker();
      this.index = this.height.map(h => (TOP - h) / LINE_HEIGHT);
      let value = this.index.length && this.mode !== 'selector'
        ? this.index
        : this.index[0];
      if (this.mode === 'time') {
        const range = [hoursRange.slice(), minutesRange.slice()];
        const timeArr = this.index.map((n, i) => range[i][n]);
        this.index = timeArr.map(item => parseInt(item));
        value = timeArr.join(':');
      }
      if (this.mode === 'date') {
        const { _start, _end, _updateValue } = this.pickerDate;
        const currentYear = _updateValue[0];
        const currentMonth = _updateValue[1];
        const yearRange = getYearRange(_start.getFullYear(), _end.getFullYear());
        const monthRange = getMonthRange(_start, _end, currentYear);
        const dayRange = getDayRange(_start, _end, currentYear, currentMonth);
        const year = yearRange[this.index[0]];
        const month = monthRange[this.index[1]];
        const day = dayRange[this.index[2]];
        if (this.fields === 'year') {
          value = [year];
        }
        else if (this.fields === 'month') {
          value = [year, month];
        }
        else {
          value = [year, month, day];
        }
        value = value
          .map(item => {
          return item < 10 ? `0${item}` : item;
        })
          .join('-');
      }
      this.value = value;
      this.pickerValue = this.value;
      this.onChange.emit({
        value
      });
    };
    this.handleColumnChange = (e) => {
      const { columnId, height } = e.detail;
      this.onColumnChange.emit({
        column: Number(columnId),
        value: (TOP - height) / LINE_HEIGHT
      });
    };
    // 点击取消按钮或蒙层
    this.handleCancel = () => {
      this.hidePicker();
      this.onCancel.emit();
    };
    this.updateHeight = (height, columnId, needRevise = false) => {
      const temp = [...this.height];
      temp[columnId] = height;
      this.height = temp;
      // time picker 必须在规定时间范围内，因此需要在 touchEnd 做修正
      if (needRevise) {
        let { start, end } = this;
        if (!verifyTime(start))
          start = '00:00';
        if (!verifyTime(end))
          end = '23:59';
        if (!compareTime(start, end))
          return;
        const range = [hoursRange.slice(), minutesRange.slice()];
        const timeList = this.height.map(h => (TOP - h) / LINE_HEIGHT);
        const timeStr = timeList.map((n, i) => range[i][n]).join(':');
        if (!compareTime(start, timeStr)) {
          // 修正到 start
          const height = start
            .split(':')
            .map(i => TOP - LINE_HEIGHT * (+i + 4));
          requestAnimationFrame(() => (this.height = height));
        }
        else if (!compareTime(timeStr, end)) {
          // 修正到 end
          const height = end
            .split(':')
            .map(i => TOP - LINE_HEIGHT * (+i + 4));
          requestAnimationFrame(() => (this.height = height));
        }
      }
    };
    this.updateDay = (value, fields) => {
      const { _start, _end, _updateValue } = this.pickerDate;
      _updateValue[fields] = value;
      const currentYear = _updateValue[0];
      const currentMonth = _updateValue[1];
      const currentDay = _updateValue[2];
      // 滚动年份
      if (fields === 0) {
        const monthRange = getMonthRange(_start, _end, currentYear);
        const max = monthRange[monthRange.length - 1];
        const min = monthRange[0];
        if (currentMonth > max)
          _updateValue[1] = max;
        if (currentMonth < min)
          _updateValue[1] = min;
        const index = monthRange.indexOf(_updateValue[1]);
        const height = TOP - LINE_HEIGHT * index;
        this.updateDay(_updateValue[1], 1);
        this.updateHeight(height, '1');
      }
      else if (fields === 1) {
        const dayRange = getDayRange(_start, _end, currentYear, currentMonth);
        const max = dayRange[dayRange.length - 1];
        const min = dayRange[0];
        if (currentDay > max)
          _updateValue[2] = max;
        if (currentDay < min)
          _updateValue[2] = min;
        const index = dayRange.indexOf(_updateValue[2]);
        const height = TOP - LINE_HEIGHT * index;
        this.updateDay(_updateValue[2], 2);
        this.updateHeight(height, '2');
      }
    };
    // 单列选择器
    this.getSelector = () => {
      return (h("taro-picker-group", { range: this.range, rangeKey: this.rangeKey, height: this.height[0], updateHeight: this.updateHeight, columnId: '0' }));
    };
    // 多列选择器
    this.getMultiSelector = () => {
      return this.range.map((range, index) => {
        return (h("taro-picker-group", { range: range, rangeKey: this.rangeKey, height: this.height[index], updateHeight: this.updateHeight, onColumnChange: this.handleColumnChange, columnId: String(index) }));
      });
    };
    // 时间选择器
    this.getTimeSelector = () => {
      const hourRange = hoursRange.slice();
      const minRange = minutesRange.slice();
      return [
        h("taro-picker-group", { mode: 'time', range: hourRange, height: this.height[0], updateHeight: this.updateHeight, columnId: '0' }),
        h("taro-picker-group", { mode: 'time', range: minRange, height: this.height[1], updateHeight: this.updateHeight, columnId: '1' })
      ];
    };
    // 日期选择器
    this.getDateSelector = () => {
      const { fields, height } = this;
      const { _start, _end, _updateValue } = this.pickerDate;
      const currentYear = _updateValue[0];
      const currentMonth = _updateValue[1];
      const yearRange = getYearRange(_start.getFullYear(), _end.getFullYear())
        .map(item => `${item}年`);
      const monthRange = getMonthRange(_start, _end, currentYear)
        .map(item => `${item < 10 ? `0${item}` : item}月`);
      const dayRange = getDayRange(_start, _end, currentYear, currentMonth)
        .map(item => `${item < 10 ? `0${item}` : item}日`);
      const renderView = [
        h("taro-picker-group", { mode: 'date', range: yearRange, height: height[0], updateDay: this.updateDay, updateHeight: this.updateHeight, columnId: '0' })
      ];
      if (fields === 'month' || fields === 'day') {
        renderView.push(h("taro-picker-group", { mode: 'date', range: monthRange, height: height[1], updateDay: this.updateDay, updateHeight: this.updateHeight, columnId: '1' }));
      }
      if (fields === 'day') {
        renderView.push(h("taro-picker-group", { mode: 'date', range: dayRange, height: height[2], updateDay: this.updateDay, updateHeight: this.updateHeight, columnId: '2' }));
      }
      return renderView;
    };
    this.mode = 'selector';
    this.disabled = false;
    this.range = [];
    this.rangeKey = undefined;
    this.value = undefined;
    this.start = '';
    this.end = '';
    this.fields = 'day';
    this.name = '';
    this.textProps = {};
    this.pickerValue = [];
    this.height = [];
    this.hidden = true;
    this.fadeOut = false;
    this.isWillLoadCalled = false;
  }
  componentWillLoad() {
    this.isWillLoadCalled = true;
    this.handleProps();
  }
  componentDidLoad() {
    if (this.overlay) {
      document.body.appendChild(this.overlay);
    }
  }
  disconnectedCallback() {
    var _a;
    if (this.overlay) {
      (_a = this.overlay.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(this.overlay);
    }
  }
  onPropsChange() {
    if (!this.isWillLoadCalled)
      return;
    this.handleProps();
  }
  handleProps() {
    const { mode, start, end } = this;
    if (mode === 'selector') {
      const value = this.value;
      this.index = [verifyValue(value, this.range) ? Math.floor(value) : 0];
    }
    else if (mode === 'multiSelector') {
      const value = this.value;
      this.index = [];
      this.range.forEach((range, index) => {
        const val = value === null || value === void 0 ? void 0 : value[index];
        const item = verifyValue(val, range) ? Math.floor(val) : 0;
        this.index.push(item);
      });
    }
    else if (mode === 'time') {
      let value = this.value;
      // check value...
      if (!verifyTime(value)) {
        console.warn('time picker value illegal');
        value = '0:0';
      }
      const time = value.split(':').map(n => +n);
      this.index = time;
    }
    else if (mode === 'date') {
      const value = this.value;
      let _value = verifyDate(value) || new Date(new Date().setHours(0, 0, 0, 0)); // 没传值或值的合法性错误默认今天时间
      const _start = verifyDate(start) || new Date('1970/01/01');
      const _end = verifyDate(end) || new Date('2999/01/01');
      // 时间区间有效性
      if (!(_start <= _end)) {
        throw new Error(`Picker start time must be less than end time.`);
      }
      if (!(_value >= _start && _value <= _end)) {
        _value = _start;
      }
      const currentYear = _value.getFullYear();
      const currentMonth = _value.getMonth() + 1;
      const currentDay = _value.getDate();
      const yearRange = getYearRange(_start.getFullYear(), _end.getFullYear());
      const monthRange = getMonthRange(_start, _end, currentYear);
      const dayRange = getDayRange(_start, _end, currentYear, currentMonth);
      this.index = [
        yearRange.indexOf(currentYear),
        monthRange.indexOf(currentMonth),
        dayRange.indexOf(currentDay)
      ];
      if (!this.pickerDate ||
        this.pickerDate._value.getTime() !== _value.getTime() ||
        this.pickerDate._start.getTime() !== _start.getTime() ||
        this.pickerDate._end.getTime() !== _end.getTime()) {
        this.pickerDate = {
          _value,
          _start,
          _end,
          _updateValue: [
            currentYear,
            currentMonth,
            currentDay
          ]
        };
      }
    }
    else {
      throw new Error(`Picker not support "${mode}" mode.`);
    }
    // Prop 变化时，无论是否正在显示弹层，都更新 height 值
    this.height = this.getHeightByIndex();
    // 同步表单 value 值，用于 form submit
    this.pickerValue = this.value;
    if (mode === 'date') {
      const val = this.pickerValue;
      if (this.fields === 'month') {
        this.pickerValue = val.split('-').slice(0, 2).join('-');
      }
      else if (this.fields === 'year') {
        this.pickerValue = val.split('-')[0];
      }
    }
  }
  render() {
    var _a, _b;
    const { name, mode, fadeOut, hidden } = this;
    // 选项条
    let pickerGroup;
    switch (mode) {
      case 'multiSelector':
        pickerGroup = this.getMultiSelector();
        break;
      case 'time':
        pickerGroup = this.getTimeSelector();
        break;
      case 'date':
        pickerGroup = this.getDateSelector();
        break;
      default:
        pickerGroup = this.getSelector();
    }
    // 动画类名控制逻辑
    const clsMask = classnames('weui-mask', 'weui-animate-fade-in', {
      'weui-animate-fade-out': fadeOut
    });
    const clsSlider = classnames('weui-picker', 'weui-animate-slide-up', {
      'weui-animate-slide-down': fadeOut
    });
    const shouldDivHidden = hidden ? { display: 'none' } : {};
    return (h(Host, null, h("div", { onClick: this.showPicker }, h("slot", null), h("input", { type: 'hidden', name: name, value: formatValue(this.pickerValue) })), h("div", { class: 'weui-picker__overlay', style: shouldDivHidden, ref: el => { this.overlay = el; } }, h("div", { class: clsMask, onClick: this.handleCancel }), h("div", { class: clsSlider }, h("div", { class: 'weui-picker__hd' }, h("div", { class: 'weui-picker__action', onClick: this.handleCancel }, (_a = this.textProps.cancelText) !== null && _a !== void 0 ? _a : '取消'), h("div", { class: 'weui-picker__action', onClick: this.handleChange }, (_b = this.textProps.okText) !== null && _b !== void 0 ? _b : '确定')), h("div", { class: 'weui-picker__bd' }, pickerGroup), h("input", { type: 'hidden', name: name, value: formatValue(this.pickerValue) })))));
  }
  get el() { return this; }
  static get watchers() { return {
    "mode": ["onPropsChange"],
    "value": ["onPropsChange"],
    "range": ["onPropsChange"],
    "start": ["onPropsChange"],
    "end": ["onPropsChange"]
  }; }
  static get style() { return indexCss; }
}, [4, "taro-picker-core", {
    "mode": [1],
    "disabled": [4],
    "range": [16],
    "rangeKey": [1, "range-key"],
    "value": [1032],
    "start": [1],
    "end": [1],
    "fields": [1],
    "name": [1],
    "textProps": [16],
    "pickerValue": [32],
    "height": [32],
    "hidden": [32],
    "fadeOut": [32],
    "isWillLoadCalled": [32]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-picker-core", "taro-picker-group"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-picker-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Picker);
      }
      break;
    case "taro-picker-group":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const TaroPickerCore = Picker;
const defineCustomElement = defineCustomElement$1;

export { TaroPickerCore, defineCustomElement };
