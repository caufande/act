import { hooks, toCamelCase } from '@tarojs/shared';
import { VIEW, PURE_VIEW, CLASS, STYLE, ID, CATCHMOVE, COMPILE_MODE, CATCH_VIEW } from './constants/index.js';
import { getComponentsAlias, isText, isHasExtractProp, isComment } from './utils/index.js';

let SPECIAL_NODES;
let componentsAlias;
/**
 * React also has a fancy function's name for this: `hydrate()`.
 * You may have been heard `hydrate` as a SSR-related function,
 * actually, `hydrate` basicly do the `render()` thing, but ignore some properties,
 * it's a vnode traverser and modifier: that's exactly what Taro's doing in here.
 */
function hydrate(node) {
    var _a;
    // 初始化 componentsAlias
    componentsAlias || (componentsAlias = getComponentsAlias());
    // 初始化 SPECIAL_NODES
    SPECIAL_NODES || (SPECIAL_NODES = hooks.call('getSpecialNodes'));
    const nodeName = node.nodeName;
    let compileModeName = null;
    if (isText(node)) {
        return {
            sid: node.sid,
            ["v" /* Shortcuts.Text */]: node.nodeValue,
            ["nn" /* Shortcuts.NodeName */]: ((_a = componentsAlias[nodeName]) === null || _a === void 0 ? void 0 : _a._num) || '8'
        };
    }
    const data = {
        ["nn" /* Shortcuts.NodeName */]: nodeName,
        sid: node.sid
    };
    if (node.uid !== node.sid) {
        data.uid = node.uid;
    }
    if (!node.isAnyEventBinded() && SPECIAL_NODES.indexOf(nodeName) > -1) {
        data["nn" /* Shortcuts.NodeName */] = `static-${nodeName}`;
        if (nodeName === VIEW && !isHasExtractProp(node)) {
            data["nn" /* Shortcuts.NodeName */] = PURE_VIEW;
        }
    }
    const { props } = node;
    for (const prop in props) {
        const propInCamelCase = toCamelCase(prop);
        if (!prop.startsWith('data-') && // 在 node.dataset 的数据
            prop !== CLASS &&
            prop !== STYLE &&
            prop !== ID &&
            propInCamelCase !== CATCHMOVE &&
            propInCamelCase !== COMPILE_MODE) {
            data[propInCamelCase] = props[prop];
        }
        if (process.env.TARO_ENV !== 'swan' &&
            nodeName === VIEW &&
            propInCamelCase === CATCHMOVE &&
            props[prop] !== false) {
            data["nn" /* Shortcuts.NodeName */] = CATCH_VIEW;
        }
        if (propInCamelCase === COMPILE_MODE) {
            compileModeName = props[prop];
        }
    }
    // Children
    data["cn" /* Shortcuts.Childnodes */] = node.childNodes.filter(node => !isComment(node)).map(hydrate);
    if (node.className !== '') {
        data["cl" /* Shortcuts.Class */] = node.className;
    }
    const cssText = node.cssText;
    if (cssText !== '' && nodeName !== 'swiper-item') {
        data["st" /* Shortcuts.Style */] = cssText;
    }
    hooks.call('modifyHydrateData', data, node);
    const nn = data["nn" /* Shortcuts.NodeName */];
    const componentAlias = componentsAlias[nn];
    if (componentAlias) {
        data["nn" /* Shortcuts.NodeName */] = componentAlias._num;
        for (const prop in data) {
            if (prop in componentAlias) {
                data[componentAlias[prop]] = data[prop];
                delete data[prop];
            }
        }
    }
    if (compileModeName !== null) {
        data["nn" /* Shortcuts.NodeName */] = compileModeName;
    }
    const resData = hooks.call('transferHydrateData', data, node, componentAlias);
    return resData || data;
}

export { hydrate };
//# sourceMappingURL=hydrate.js.map
