import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';

const TOP = 102;
const LINE_HEIGHT = 34;
const MASK_HEIGHT = LINE_HEIGHT * 7;

const TaroPickerGroup = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.onColumnChange = createEvent(this, "columnChange", 7);
    this.mode = undefined;
    this.range = [];
    this.rangeKey = undefined;
    this.height = undefined;
    this.columnId = undefined;
    this.updateHeight = undefined;
    this.updateDay = undefined;
    this.startY = undefined;
    this.preY = undefined;
    this.hadMove = undefined;
    this.touchEnd = undefined;
    this.isMove = undefined;
  }
  getPosition() {
    const transition = this.touchEnd ? 0.3 : 0;
    const transformValue = `translate3d(0, ${this.height}px, 0)`;
    const transitionValue = `transform ${transition}s`;
    return {
      transform: transformValue,
      '-webkit-transform': transformValue,
      transition: transitionValue,
      '-webkit-transition': transitionValue
    };
  }
  formulaUnlimitedScroll(range, absoluteHeight, direction) {
    const { height, updateHeight, columnId } = this;
    const factor = direction === 'up' ? 1 : -1;
    this.touchEnd = false;
    // 点击超过范围，点击到补帧时，先跳到另一端的补帧
    updateHeight(-range * factor * LINE_HEIGHT + height, columnId);
    // 再做过渡动画
    requestAnimationFrame(() => {
      this.touchEnd = true;
      const index = Math.round(absoluteHeight / -LINE_HEIGHT) + range * factor;
      const relativeHeight = TOP - LINE_HEIGHT * index;
      updateHeight(relativeHeight, columnId, true);
    });
  }
  async handleMoveStart(clientY) {
    // 记录第一次的点击位置
    this.startY = clientY;
    this.preY = clientY;
    this.hadMove = false;
  }
  async handleMoving(clientY) {
    const y = clientY;
    const deltaY = y - this.preY;
    this.preY = y;
    this.touchEnd = false;
    if (Math.abs(y - this.startY) > 10)
      this.hadMove = true;
    let newPos = this.height + deltaY;
    // 处理时间选择器的无限滚动
    if (this.mode === 'time') {
      if (this.columnId === '0') {
        // 数字 28 来自于 4 格补帧 + 0 ～ 23 的 24 格，共 28 格
        if (newPos > TOP - LINE_HEIGHT * 3) {
          newPos = TOP - LINE_HEIGHT * 27 + deltaY;
        }
        if (newPos < TOP - LINE_HEIGHT * 28) {
          newPos = TOP - LINE_HEIGHT * 4 + deltaY;
        }
      }
      else if (this.columnId === '1') {
        if (newPos > TOP - LINE_HEIGHT * 3) {
          newPos = TOP - LINE_HEIGHT * 63 + deltaY;
        }
        if (newPos < TOP - LINE_HEIGHT * 64) {
          newPos = TOP - LINE_HEIGHT * 4 + deltaY;
        }
      }
    }
    this.updateHeight(newPos, this.columnId);
  }
  async handleMoveEnd(clientY) {
    const { mode, range, height, updateHeight, columnId } = this;
    const max = 0;
    const min = -LINE_HEIGHT * (range.length - 1);
    const endY = clientY;
    this.touchEnd = true;
    // touchEnd 时的高度，可能带小数点，需要再处理
    let absoluteHeight;
    if (!this.hadMove) {
      /** 点击 */
      // 屏幕高度
      const windowHeight = window.innerHeight;
      // picker__mask 垂直方向距离屏幕顶部的高度
      const relativeY = windowHeight - MASK_HEIGHT / 2;
      absoluteHeight = height - TOP - (endY - relativeY);
      // 处理时间选择器的无限滚动
      if (mode === 'time') {
        if (columnId === '0') {
          // 点击上溢出
          // absoluteHeight 是相对模块中点来算的，所以会算多半行，这时要减去这半行，即2.5行
          if (absoluteHeight > -LINE_HEIGHT * 2.5) {
            return this.formulaUnlimitedScroll(24, absoluteHeight, 'up');
          }
          // 点击下溢出
          if (absoluteHeight < -LINE_HEIGHT * 28.5) {
            return this.formulaUnlimitedScroll(24, absoluteHeight, 'down');
          }
        }
        else if (columnId === '1') {
          // 点击上溢出
          if (absoluteHeight > -LINE_HEIGHT * 2.5) {
            return this.formulaUnlimitedScroll(60, absoluteHeight, 'up');
          }
          // 点击下溢出
          if (absoluteHeight < -LINE_HEIGHT * 64.5) {
            return this.formulaUnlimitedScroll(60, absoluteHeight, 'down');
          }
        }
      }
    }
    else {
      /** 滚动 */
      absoluteHeight = height - TOP;
    }
    // 边界情况处理
    if (absoluteHeight > max)
      absoluteHeight = 0;
    if (absoluteHeight < min)
      absoluteHeight = min;
    // 先按公式算出 index, 再用此 index 算出一个整数高度
    const index = Math.round(absoluteHeight / -LINE_HEIGHT);
    const relativeHeight = TOP - LINE_HEIGHT * index;
    if (this.mode === 'date' && typeof this.updateDay === 'function') {
      if (this.columnId === '0') {
        this.updateDay(+this.range[index].replace(/[^0-9]/gi, ''), 0);
      }
      if (this.columnId === '1') {
        this.updateDay(+this.range[index].replace(/[^0-9]/gi, ''), 1);
      }
      if (this.columnId === '2') {
        this.updateDay(+this.range[index].replace(/[^0-9]/gi, ''), 2);
      }
    }
    updateHeight(relativeHeight, columnId, mode === 'time');
    this.onColumnChange.emit({
      columnId,
      height: relativeHeight,
    });
  }
  onMouseDown(e) {
    this.isMove = true;
    this.handleMoveStart(e.clientY);
  }
  onMouseMove(e) {
    if (!this.isMove)
      return;
    this.handleMoving(e.clientY);
  }
  onMouseMoveEnd(e) {
    if (!this.isMove)
      return;
    this.isMove = false;
    this.handleMoveEnd(e.clientY);
  }
  onTouchStart(e) {
    this.handleMoveStart(e.changedTouches[0].clientY);
  }
  onTouchMove(e) {
    this.handleMoving(e.changedTouches[0].clientY);
  }
  onTouchEnd(e) {
    this.handleMoveEnd(e.changedTouches[0].clientY);
  }
  render() {
    const { range, rangeKey } = this;
    const pickerItem = range.map(item => {
      const content = rangeKey ? item[rangeKey] : item;
      return (h("div", { class: 'weui-picker__item' }, content));
    });
    return (h(Host, { class: 'weui-picker__group' }, h("div", { class: 'weui-picker__mask' }), h("div", { class: 'weui-picker__indicator' }), h("div", { class: 'weui-picker__content', style: this.getPosition() }, pickerItem)));
  }
}, [0, "taro-picker-group", {
    "mode": [1],
    "range": [16],
    "rangeKey": [1, "range-key"],
    "height": [2],
    "columnId": [1, "column-id"],
    "updateHeight": [16],
    "updateDay": [16],
    "startY": [32],
    "preY": [32],
    "hadMove": [32],
    "touchEnd": [32],
    "isMove": [32],
    "handleMoveStart": [64],
    "handleMoving": [64],
    "handleMoveEnd": [64]
  }, [[1, "mousedown", "onMouseDown"], [3, "mousemove", "onMouseMove"], [1, "mouseup", "onMouseMoveEnd"], [1, "mouseleave", "onMouseMoveEnd"], [1, "touchstart", "onTouchStart"], [3, "touchmove", "onTouchMove"], [1, "touchend", "onTouchEnd"]]]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-picker-group"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-picker-group":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TaroPickerGroup);
      }
      break;
  } });
}

export { LINE_HEIGHT as L, TOP as T, TaroPickerGroup as a, defineCustomElement as d };
