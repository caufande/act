import './style/index.scss.js';
import classNames from 'classnames';
import React__default from 'react';
import { omit, createForwardRefComponent } from '../../utils/index.js';
import { jsx } from 'react/jsx-runtime';

function getTrueType(type, confirmType, password) {
  if (confirmType === 'search') type = 'search';
  if (password) type = 'password';
  if (typeof type === 'undefined') {
    return 'text';
  }
  if (!type) {
    throw new Error('unexpected type');
  }
  if (type === 'digit') type = 'number';
  return type;
}
function fixControlledValue(value) {
  return value !== null && value !== void 0 ? value : '';
}
class Input extends React__default.Component {
  constructor(props) {
    super(props);
    this.handleBeforeInput = e => {
      if (!e.data) return;
      const isNumber = e.data && /[0-9]/.test(e.data);
      if (this.props.type === 'number' && !isNumber) {
        e.preventDefault();
      }
      if (this.props.type === 'digit' && !isNumber) {
        if (e.data !== '.' || e.data === '.' && e.target.value.indexOf('.') > -1) {
          e.preventDefault();
        }
      }
    };
    this.handleInput = this.handleInput.bind(this);
    this.handlePaste = this.handlePaste.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleComposition = this.handleComposition.bind(this);
    this.handleBeforeInput = this.handleBeforeInput.bind(this);
    this.isOnComposition = false;
    this.onInputExcuted = false;
  }
  componentDidMount() {
    var _a, _b;
    // 修复无法选择文件
    if (this.props.type === 'file') {
      (_a = this.inputRef) === null || _a === void 0 ? void 0 : _a.addEventListener('change', this.handleInput);
    } else {
      (_b = this.inputRef) === null || _b === void 0 ? void 0 : _b.addEventListener('textInput', this.handleBeforeInput);
    }
    // 处理初始化是否 focus
    if (this.props.focus && this.inputRef) this.inputRef.focus();
  }
  componentWillUnmount() {
    var _a;
    // 修复无法选择文件
    if (this.props.type === 'file') {
      this.inputRef.removeEventListener('change', this.handleInput);
    } else {
      (_a = this.inputRef) === null || _a === void 0 ? void 0 : _a.removeEventListener('textInput', this.handleBeforeInput);
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!this.props.focus && nextProps.focus && this.inputRef) this.inputRef.focus();
  }
  handleInput(e) {
    e.stopPropagation();
    const {
      type,
      maxlength = 140,
      confirmType = 'done',
      password = false,
      onInput
    } = this.props;
    if (!this.isOnComposition && !this.onInputExcuted) {
      let {
        value
      } = e.target;
      const inputType = getTrueType(type, confirmType, password);
      this.onInputExcuted = true;
      /* 修复 number 类型 maxLength 无效 */
      if (inputType === 'number' && value && maxlength <= value.length) {
        value = value.substring(0, maxlength);
        e.target.value = value;
      }
      Object.defineProperty(e, 'detail', {
        value: {
          value,
          cursor: value.length
        }
      });
      // // 修复 IOS 光标跳转问题
      // if (!(['number', 'file'].indexOf(inputType) >= 0)) {
      //   const pos = e.target.selectionEnd
      //   setTimeout(
      //     () => {
      //       e.target.selectionStart = pos
      //       e.target.selectionEnd = pos
      //     }
      //   )
      // }
      typeof onInput === 'function' && onInput(e);
      this.onInputExcuted = false;
    }
  }
  handlePaste(e) {
    e.stopPropagation();
    const {
      onPaste
    } = this.props;
    this.onInputExcuted = false;
    Object.defineProperty(e, 'detail', {
      value: {
        value: e.target.value
      }
    });
    typeof onPaste === 'function' && onPaste(e);
  }
  handleFocus(e) {
    e.stopPropagation();
    const {
      onFocus
    } = this.props;
    this.onInputExcuted = false;
    Object.defineProperty(e, 'detail', {
      value: {
        value: e.target.value
      }
    });
    onFocus && onFocus(e);
  }
  handleBlur(e) {
    e.stopPropagation();
    const {
      onBlur
    } = this.props;
    Object.defineProperty(e, 'detail', {
      value: {
        value: e.target.value
      }
    });
    onBlur && onBlur(e);
  }
  handleKeyDown(e) {
    e.stopPropagation();
    const {
      onConfirm,
      onKeyDown
    } = this.props;
    const {
      value
    } = e.target;
    const keyCode = e.keyCode || e.code;
    this.onInputExcuted = false;
    if (typeof onKeyDown === 'function') {
      Object.defineProperty(e, 'detail', {
        value: {
          value,
          cursor: value.length,
          keyCode
        }
      });
      onKeyDown(e);
    }
    if (e.keyCode === 13 && typeof onConfirm === 'function') {
      Object.defineProperty(e, 'detail', {
        value: {
          value
        }
      });
      onConfirm(e);
    }
  }
  handleComposition(e) {
    e.stopPropagation();
    if (!(e.target instanceof HTMLInputElement)) return;
    if (e.type === 'compositionend') {
      this.isOnComposition = false;
      this.handleInput(e);
    } else {
      this.isOnComposition = true;
    }
  }
  render() {
    const {
      className = '',
      placeholder,
      type,
      password = false,
      disabled = false,
      maxlength = 140,
      confirmType = 'done',
      name,
      value
    } = this.props;
    const cls = classNames('taro-input-core', 'weui-input', className);
    const otherProps = omit(this.props, ['forwardedRef', 'className', 'placeholder', 'disabled', 'password', 'type', 'maxlength', 'confirmType', 'focus', 'name']);
    if ('value' in this.props) {
      otherProps.value = fixControlledValue(value);
    }
    return /*#__PURE__*/jsx("input", {
      ref: input => {
        if (this.props.forwardedRef) {
          this.props.forwardedRef.current = input;
        }
        this.inputRef = input;
      },
      ...otherProps,
      className: cls,
      type: getTrueType(type, confirmType, password),
      placeholder: placeholder,
      disabled: disabled,
      maxLength: maxlength,
      name: name,
      onInput: this.handleInput,
      onPaste: this.handlePaste,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      onKeyDown: this.handleKeyDown,
      onCompositionStart: this.handleComposition,
      onCompositionEnd: this.handleComposition,
      onBeforeInput: this.handleBeforeInput
    });
  }
}
var index = createForwardRefComponent(Input);

export { index as default };
//# sourceMappingURL=index.js.map
