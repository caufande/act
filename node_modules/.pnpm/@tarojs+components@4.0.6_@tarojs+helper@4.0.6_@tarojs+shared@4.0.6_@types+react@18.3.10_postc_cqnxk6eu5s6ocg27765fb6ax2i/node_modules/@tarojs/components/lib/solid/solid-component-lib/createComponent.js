import { isFunction } from '@tarojs/shared';
import { splitProps, mergeProps } from 'solid-js';
import h from 'solid-js/h';
import { effect, memo } from 'solid-js/web';
import './utils/index.js';
import { syncAttribute, syncEvent } from './utils/element.js';
import { isPropNameAnEvent, isReactiveKey, camelToDashCase } from './utils/case.js';

function setReactiveProps(node, getterObj) {
    effect(() => {
        for (const key in getterObj) {
            syncAttribute(node, key, getterObj[key]);
        }
    });
}
function syncEvents(node, eventsMap) {
    for (const [key, value] of eventsMap) {
        syncEvent(node, key, value);
    }
}
const createSolidComponent = (tagName, manipulatePropsFunction, defineCustomElement) => {
    if (defineCustomElement !== undefined) {
        defineCustomElement();
    }
    function SolidComponentWrapper(props) {
        const [local, other] = splitProps(props, ['children', 'ref']);
        const eventsMap = new Map();
        const reactiveKeys = [];
        const getUnTrackProps = (_props) => {
            let propsToPass = {};
            for (const key in _props) {
                if (!_props.hasOwnProperty(key)) {
                    continue;
                }
                if (isPropNameAnEvent(key)) {
                    eventsMap.set(key, _props[key]);
                    continue;
                }
                if (isReactiveKey(_props, key)) {
                    reactiveKeys.push(key);
                    continue;
                }
                const propValue = _props[key];
                propsToPass[camelToDashCase(key)] = propValue;
            }
            if (manipulatePropsFunction !== undefined) {
                propsToPass = manipulatePropsFunction(_props, propsToPass);
            }
            return propsToPass;
        };
        const unTrackProps = getUnTrackProps(other);
        const [reactiveProps] = splitProps(other, reactiveKeys);
        const _mergeProps = mergeProps(unTrackProps, {
            ref: (element) => {
                if (local.ref && isFunction(local.ref))
                    local.ref(element);
                syncEvents(element, eventsMap);
                setReactiveProps(element, reactiveProps);
            }
        });
        return memo(() => h(tagName, _mergeProps, local.children), true);
    }
    return SolidComponentWrapper;
};

export { createSolidComponent };
//# sourceMappingURL=createComponent.js.map
