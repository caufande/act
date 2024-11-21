import { MutationObserver } from '../dom-external/mutation-observer/index.js';
import { TaroNode } from './node.js';

class TaroText extends TaroNode {
    constructor(value) {
        super();
        this.nodeType = 3 /* NodeType.TEXT_NODE */;
        this.nodeName = '#text';
        this._value = value;
    }
    set textContent(text) {
        MutationObserver.record({
            target: this,
            type: "characterData" /* MutationRecordType.CHARACTER_DATA */,
            oldValue: this._value
        });
        this._value = text;
        this.enqueueUpdate({
            path: `${this._path}.${"v" /* Shortcuts.Text */}`,
            value: text
        });
    }
    get textContent() {
        return this._value;
    }
    set nodeValue(text) {
        this.textContent = text;
    }
    get nodeValue() {
        return this._value;
    }
    set data(text) {
        this.textContent = text;
    }
    get data() {
        return this._value;
    }
}

export { TaroText };
//# sourceMappingURL=text.js.map
