import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';

const indexCss = "taro-textarea-core{width:300px;display:block}taro-textarea-core .auto-height{height:auto}.taro-textarea{height:inherit;-webkit-appearance:none;-moz-appearance:none;appearance:none;cursor:auto;border:0;width:100%;line-height:1.5;display:block;position:relative}.taro-textarea:focus{outline:none}";

function fixControlledValue(value) {
  return value !== null && value !== void 0 ? value : '';
}
const Textarea = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.onInput = createEvent(this, "input", 7);
    this.onFocus = createEvent(this, "focus", 7);
    this.onBlur = createEvent(this, "blur", 7);
    this.onConfirm = createEvent(this, "confirm", 7);
    this.onChange = createEvent(this, "change", 7);
    this.onLineChange = createEvent(this, "linechange", 7);
    this.onKeyDown = createEvent(this, "keydown", 7);
    this.handleInput = (e) => {
      e.stopPropagation();
      this.handleLineChange();
      const value = e.target.value || '';
      this.value = value;
      this.onInput.emit({
        value,
        cursor: value.length
      });
    };
    this.handleFocus = (e) => {
      e.stopPropagation();
      this.onFocus.emit({
        value: e.target.value
      });
    };
    this.handleBlur = (e) => {
      e.stopPropagation();
      this.onBlur.emit({
        value: e.target.value
      });
    };
    this.handleChange = (e) => {
      e.stopPropagation();
      this.onChange.emit({
        value: e.target.value
      });
    };
    this.handleLineChange = () => {
      const line = this.getNumberOfLines();
      if (line !== this.line) {
        this.line = line;
        this.onLineChange.emit({
          height: this.textareaRef.clientHeight,
          lineCount: this.line
        });
      }
    };
    this.handleKeyDown = (e) => {
      e.stopPropagation();
      const { value } = e.target;
      const keyCode = e.keyCode || e.code;
      this.onKeyDown.emit({
        value,
        cursor: value.length,
        keyCode
      });
      keyCode === 13 && this.onConfirm.emit({ value });
    };
    this.calculateContentHeight = (ta, scanAmount) => {
      let origHeight = ta.style.height, height = ta.offsetHeight, scrollHeight = ta.scrollHeight, overflow = ta.style.overflow, originMinHeight = ta.style.minHeight || null;
      /// only bother if the ta is bigger than content
      if (height >= scrollHeight) {
        ta.style.minHeight = 0;
        /// check that our browser supports changing dimension
        /// calculations mid-way through a function call...
        ta.style.height = height + scanAmount + 'px';
        /// because the scrollbar can cause calculation problems
        ta.style.overflow = 'hidden';
        /// by checking that scrollHeight has updated
        if (scrollHeight < ta.scrollHeight) {
          /// now try and scan the ta's height downwards
          /// until scrollHeight becomes larger than height
          while (ta.offsetHeight >= ta.scrollHeight) {
            ta.style.height = (height -= scanAmount) + 'px';
          }
          /// be more specific to get the exact height
          while (ta.offsetHeight < ta.scrollHeight) {
            ta.style.height = height++ + 'px';
          }
          /// reset the ta back to it's original height
          ta.style.height = origHeight;
          /// put the overflow back
          ta.style.overflow = overflow;
          ta.style.minHeight = originMinHeight;
          return height;
        }
      }
      else {
        return scrollHeight;
      }
    };
    this.getNumberOfLines = () => {
      const ta = this.textareaRef, style = window.getComputedStyle ? window.getComputedStyle(ta) : ta.style, 
      // This will get the line-height only if it is set in the css,
      // otherwise it's "normal"
      taLineHeight = parseInt(style.lineHeight, 10), 
      // Get the scroll height of the textarea
      taHeight = this.calculateContentHeight(ta, taLineHeight), 
      // calculate the number of lines
      numberOfLines = Math.floor(taHeight / taLineHeight);
      return numberOfLines;
    };
    this.value = '';
    this.placeholder = undefined;
    this.disabled = false;
    this.maxlength = 140;
    this.autoFocus = false;
    this.autoHeight = false;
    this.name = undefined;
    this.nativeProps = {};
    this.line = 1;
  }
  watchAutoFocus(newValue, oldValue) {
    var _a;
    if (!oldValue && newValue) {
      (_a = this.textareaRef) === null || _a === void 0 ? void 0 : _a.focus();
    }
  }
  watchValue(newValue) {
    // hack: 在事件回调中，props.value 变化不知为何不会触发 Stencil 更新，因此这里手动更新一下
    const value = fixControlledValue(newValue);
    if (this.textareaRef.value !== value) {
      this.textareaRef.value = value;
    }
  }
  async focus() {
    this.textareaRef.focus();
  }
  render() {
    const { value, placeholder, disabled, maxlength, autoFocus, autoHeight, name, nativeProps, handleInput, handleFocus, handleBlur, handleChange } = this;
    const otherProps = {};
    if (autoHeight) {
      otherProps.rows = this.line;
    }
    return (h("textarea", Object.assign({ ref: input => {
        if (input) {
          this.textareaRef = input;
          if (autoFocus && input)
            input.focus();
        }
      }, class: `taro-textarea ${autoHeight ? 'auto-height' : ''}`, value: fixControlledValue(value), placeholder: placeholder, name: name, disabled: disabled, maxlength: maxlength, autofocus: autoFocus, onInput: handleInput, onFocus: handleFocus, onBlur: handleBlur, onChange: handleChange, onKeyDown: this.handleKeyDown }, nativeProps, otherProps)));
  }
  get el() { return this; }
  static get watchers() { return {
    "autoFocus": ["watchAutoFocus"],
    "value": ["watchValue"]
  }; }
  static get style() { return indexCss; }
}, [0, "taro-textarea-core", {
    "value": [1025],
    "placeholder": [1],
    "disabled": [4],
    "maxlength": [2],
    "autoFocus": [4, "focus"],
    "autoHeight": [4, "auto-height"],
    "name": [1],
    "nativeProps": [16],
    "line": [32],
    "focus": [64]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-textarea-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-textarea-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Textarea);
      }
      break;
  } });
}

const TaroTextareaCore = Textarea;
const defineCustomElement = defineCustomElement$1;

export { TaroTextareaCore, defineCustomElement };
