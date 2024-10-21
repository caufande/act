import { PLATFORM_TYPE } from '@tarojs/shared';
import { TaroElement } from '../dom/element.js';
import { TaroNode } from '../dom/node.js';
import { setInnerHTML } from './inner-html/html.js';
import { getBoundingClientRectImpl, getTemplateContent } from './element.js';
import { insertAdjacentHTML, cloneNode, contains } from './node.js';

if (process.env.TARO_PLATFORM !== PLATFORM_TYPE.WEB && process.env.TARO_PLATFORM !== PLATFORM_TYPE.HARMONY) {
    if (ENABLE_INNER_HTML) {
        TaroNode.extend('innerHTML', {
            set(html) {
                setInnerHTML.call(this, this, html);
            },
            get() {
                return '';
            }
        });
        if (ENABLE_ADJACENT_HTML) {
            TaroNode.extend('insertAdjacentHTML', insertAdjacentHTML);
        }
    }
    if (ENABLE_CLONE_NODE) {
        TaroNode.extend('cloneNode', cloneNode);
    }
    if (ENABLE_CONTAINS) {
        TaroNode.extend('contains', contains);
    }
    if (ENABLE_SIZE_APIS) {
        TaroElement.extend('getBoundingClientRect', getBoundingClientRectImpl);
    }
    if (ENABLE_TEMPLATE_CONTENT) {
        TaroElement.extend('content', {
            get() {
                return getTemplateContent(this);
            }
        });
    }
}
//# sourceMappingURL=index.js.map
