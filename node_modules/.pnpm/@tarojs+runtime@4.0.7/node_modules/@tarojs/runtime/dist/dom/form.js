import { TYPE, VALUE, CHANGE, INPUT } from '../constants/index.js';
import { TaroElement } from './element.js';

class FormElement extends TaroElement {
    get type() {
        var _a;
        return (_a = this.props[TYPE]) !== null && _a !== void 0 ? _a : '';
    }
    set type(val) {
        this.setAttribute(TYPE, val);
    }
    get value() {
        // eslint-disable-next-line dot-notation
        const val = this.props[VALUE];
        return val == null ? '' : val;
    }
    set value(val) {
        this.setAttribute(VALUE, val);
    }
    dispatchEvent(event) {
        if (event.mpEvent) {
            const val = event.mpEvent.detail.value;
            if (event.type === CHANGE) {
                this.props.value = val;
            }
            else if (event.type === INPUT) {
                // Web 规范中表单组件的 value 应该跟着输入改变
                // 只是改 this.props.value 的话不会进行 setData，因此这里修改 this.value。
                // 只测试了 React、Vue3 input 组件的 onInput 事件，onChange 事件不确定有没有副作用，所以暂不修改。
                this.value = val;
            }
        }
        return super.dispatchEvent(event);
    }
}

export { FormElement };
//# sourceMappingURL=form.js.map
