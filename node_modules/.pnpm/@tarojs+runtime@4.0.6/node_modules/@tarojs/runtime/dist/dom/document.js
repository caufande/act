import { toCamelCase, controlledComponent, isUndefined } from '@tarojs/shared';
import { DOCUMENT_ELEMENT_NAME, A, ROOT_STR, COMMENT } from '../constants/index.js';
import { TaroElement } from './element.js';
import { createEvent } from './event.js';
import { eventSource } from './event-source.js';
import { FormElement } from './form.js';
import { TaroRootElement } from './root.js';
import { TaroText } from './text.js';
import env from '../env.js';
import { AnchorElement } from './anchor-element.js';
import { TransferElement } from './transfer.js';

class TaroDocument extends TaroElement {
    constructor() {
        super();
        this.createEvent = createEvent;
        this.nodeType = 9 /* NodeType.DOCUMENT_NODE */;
        this.nodeName = DOCUMENT_ELEMENT_NAME;
    }
    createElement(type) {
        const nodeName = type.toLowerCase();
        let element;
        switch (true) {
            case nodeName === ROOT_STR:
                element = new TaroRootElement();
                return element;
            case controlledComponent.has(nodeName):
                element = new FormElement();
                break;
            case nodeName === A:
                element = new AnchorElement();
                break;
            case nodeName === 'page-meta':
            case nodeName === 'navigation-bar':
                element = new TransferElement(toCamelCase(nodeName));
                break;
            default:
                element = new TaroElement();
                break;
        }
        element.nodeName = nodeName;
        element.tagName = type.toUpperCase();
        return element;
    }
    // an ugly fake createElementNS to deal with @vue/runtime-dom's
    // support mounting app to svg container since vue@3.0.8
    createElementNS(_svgNS, type) {
        return this.createElement(type);
    }
    createTextNode(text) {
        return new TaroText(text);
    }
    getElementById(id) {
        const el = eventSource.get(id);
        return isUndefined(el) ? null : el;
    }
    querySelector(query) {
        // 为了 Vue3 的乞丐版实现
        if (/^#/.test(query)) {
            return this.getElementById(query.slice(1));
        }
        return null;
    }
    querySelectorAll() {
        // fake hack
        return [];
    }
    // @TODO: @PERF: 在 hydrate 移除掉空的 node
    createComment() {
        const textnode = new TaroText('');
        textnode.nodeName = COMMENT;
        return textnode;
    }
    get defaultView() {
        return env.window;
    }
}

export { TaroDocument };
//# sourceMappingURL=document.js.map
