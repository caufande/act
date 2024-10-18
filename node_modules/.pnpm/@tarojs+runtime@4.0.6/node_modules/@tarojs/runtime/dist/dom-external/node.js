import { PROPS, DATASET, OBJECT, STYLE } from '../constants/index.js';
import { parser } from './inner-html/parser.js';

/**
 * An implementation of `Element.insertAdjacentHTML()`
 * to support Vue 3 with a version of or greater than `vue@3.1.2`
 */
function insertAdjacentHTML(position, html) {
    var _a, _b;
    const parsedNodes = parser(html, this.ownerDocument);
    for (let i = 0; i < parsedNodes.length; i++) {
        const n = parsedNodes[i];
        switch (position) {
            case 'beforebegin':
                (_a = this.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(n, this);
                break;
            case 'afterbegin':
                if (this.hasChildNodes()) {
                    this.insertBefore(n, this.childNodes[0]);
                }
                else {
                    this.appendChild(n);
                }
                break;
            case 'beforeend':
                this.appendChild(n);
                break;
            case 'afterend':
                (_b = this.parentNode) === null || _b === void 0 ? void 0 : _b.appendChild(n);
                break;
        }
    }
}
function cloneNode(isDeep = false) {
    const document = this.ownerDocument;
    let newNode;
    if (this.nodeType === 1 /* NodeType.ELEMENT_NODE */) {
        newNode = document.createElement(this.nodeName);
    }
    else if (this.nodeType === 3 /* NodeType.TEXT_NODE */) {
        newNode = document.createTextNode('');
    }
    for (const key in this) {
        const value = this[key];
        // eslint-disable-next-line valid-typeof
        if ([PROPS, DATASET].includes(key) && typeof value === OBJECT) {
            newNode[key] = Object.assign({}, value);
        }
        else if (key === '_value') {
            newNode[key] = value;
        }
        else if (key === STYLE) {
            newNode.style._value = Object.assign({}, value._value);
            newNode.style._usedStyleProp = new Set(Array.from(value._usedStyleProp));
        }
    }
    if (isDeep) {
        newNode.childNodes = this.childNodes.map(node => node.cloneNode(true));
    }
    return newNode;
}
function contains(node) {
    let isContains = false;
    this.childNodes.some(childNode => {
        const { uid } = childNode;
        if (uid === node.uid || uid === node.id || childNode.contains(node)) {
            isContains = true;
            return true;
        }
    });
    return isContains;
}

export { cloneNode, contains, insertAdjacentHTML };
//# sourceMappingURL=node.js.map
