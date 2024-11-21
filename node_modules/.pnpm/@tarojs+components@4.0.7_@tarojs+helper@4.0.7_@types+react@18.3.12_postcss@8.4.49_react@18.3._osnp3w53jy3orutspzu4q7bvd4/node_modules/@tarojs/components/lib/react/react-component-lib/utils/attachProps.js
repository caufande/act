import { flushSync, unstable_batchedUpdates } from 'react-dom';
import { camelToDashCase } from './case.js';

/**
 * Modify from https://github.com/ionic-team/stencil-ds-output-targets/blob/main/packages/react-output-target/react-component-lib/utils/attachProps.ts
 * MIT License https://github.com/ionic-team/stencil-ds-output-targets/blob/main/LICENSE
 */
const arrayToMap = (arr) => {
    const map = new Map();
    arr.forEach((s) => map.set(s, s));
    return map;
};
const getClassName = (classList, newProps, oldProps) => {
    const newClassProp = newProps.className || newProps.class;
    const oldClassProp = oldProps.className || oldProps.class;
    // map the classes to Maps for performance
    const currentClasses = arrayToMap(classList);
    const incomingPropClasses = arrayToMap(newClassProp ? newClassProp.split(' ') : []);
    const oldPropClasses = arrayToMap(oldClassProp ? oldClassProp.split(' ') : []);
    const finalClassNames = [];
    // loop through each of the current classes on the component
    // to see if it should be a part of the classNames added
    currentClasses.forEach((currentClass) => {
        if (incomingPropClasses.has(currentClass)) {
            // add it as its already included in classnames coming in from newProps
            finalClassNames.push(currentClass);
            incomingPropClasses.delete(currentClass);
        }
        else if (!oldPropClasses.has(currentClass)) {
            // add it as it has NOT been removed by user
            finalClassNames.push(currentClass);
        }
    });
    incomingPropClasses.forEach((s) => finalClassNames.push(s));
    return finalClassNames.join(' ');
};
// Note(taro): 禁用 react 合成事件抛出 (避免自定义事件属性调用问题, 例如: event.detail.value 等)
const isCoveredByReact = (__eventNameSuffix) => false;
function getComponentName(node) {
    return node.tagName.replace(/^TARO-/, '').replace(/-CORE$/, '');
}
function getControlledValue(node) {
    const componentName = getComponentName(node);
    if (['INPUT', 'TEXTAREA', 'SLIDER', 'PICKER'].includes(componentName)) {
        return 'value';
    }
    else if (componentName === 'SWITCH') {
        // Radio、Checkbox 受 RadioGroup、CheckboxGroup 控制，不支持受控
        return 'checked';
    }
    else {
        return null;
    }
}
function getPropsAfterReactUpdate(node) {
    const key = Object.keys(node).find(key => key.includes('__reactProps'));
    if (key) {
        return node[key];
    }
    else {
        return null;
    }
}
function finishedEventHandler(node) {
    const controlledValue = getControlledValue(node);
    // 不是可以受控的表单组件，直接返回
    if (!controlledValue)
        return;
    // 立即执行事件回调中用户可能触发了的 React 更新
    flushSync(() => { });
    // 组件在 React 更新后的 React props
    const newProps = getPropsAfterReactUpdate(node);
    if ((newProps === null || newProps === void 0 ? void 0 : newProps.hasOwnProperty(controlledValue)) && newProps[controlledValue] !== node[controlledValue]) {
        // 如果 React Props 的 value 和 DOM 上的 value 不一致，以 React Props 为准（受控）
        node[controlledValue] = newProps[controlledValue];
        node.setAttribute(controlledValue, newProps[controlledValue]);
    }
}
const syncEvent = (node, eventName, newEventHandler) => {
    const eventStore = node.__events || (node.__events = {});
    const oldEventHandler = eventStore[eventName];
    if (!newEventHandler) {
        oldEventHandler && node.removeEventListener(eventName, oldEventHandler);
    }
    else {
        if (oldEventHandler) {
            if (oldEventHandler.fn === newEventHandler) {
                return;
            }
            else {
                // 删除旧的，绑定新的
                node.removeEventListener(eventName, oldEventHandler);
            }
        }
        const listener = eventStore[eventName] = function (e) {
            // React batch event updates
            unstable_batchedUpdates(() => newEventHandler.call(this, e));
            // 控制是否更新受控组件的 value 值
            finishedEventHandler(node);
        };
        listener.fn = newEventHandler;
        node.addEventListener(eventName, listener);
    }
};
// TODO(performace): ReactComponent 已更新了一次，这里手动更新可能存在重复设置属性的问题
const attachProps = (node, newProps, oldProps = {}) => {
    // some test frameworks don't render DOM elements, so we test here to make sure we are dealing with DOM first
    if (node instanceof Element) {
        Object.keys(oldProps).forEach((name) => {
            if (['style', 'children', 'ref', 'class', 'className', 'forwardedRef'].includes(name)) {
                return;
            }
            // Note: 移除节点上冗余事件、属性
            if (!newProps.hasOwnProperty(name)) {
                if (/^on([A-Z].*)/.test(name)) {
                    const eventName = name.substring(2);
                    const eventNameLc = eventName.toLowerCase();
                    if (!isCoveredByReact(eventNameLc)) {
                        syncEvent(node, eventNameLc);
                    }
                }
                else {
                    node[name] = null;
                    node.removeAttribute(camelToDashCase(name));
                }
            }
        });
        // add any classes in className to the class list
        node.className = getClassName(node.classList, newProps, oldProps);
        Object.keys(newProps).forEach((name) => {
            /** Note(taro): 优化 style 属性的处理
             * 1. 考虑到兼容旧版本项目，支持使用字符串配置 style 属性，但这并非推荐写法，且不考虑优化在 style 移除时同步删除属性
             * 2. style 属性应当交与前端 UI 框架自行处理，不考虑实现类似于 reactify-wc 的更新策略
             */
            if ((name === 'style' && typeof newProps[name] !== 'string') || ['children', 'ref', 'class', 'className', 'forwardedRef'].includes(name)) {
                return;
            }
            if (/^on([A-Z].*)/.test(name)) {
                const eventName = name.substring(2);
                const eventNameLc = eventName.toLowerCase();
                if (!isCoveredByReact(eventNameLc)) {
                    syncEvent(node, eventNameLc, newProps[name]);
                }
            }
            else {
                node[name] = newProps[name];
                const propType = typeof newProps[name];
                if (propType === 'string') {
                    node.setAttribute(camelToDashCase(name), newProps[name]);
                }
            }
        });
        // 保证受控组件会被默认绑定一个空事件，用于触发 finishedEventHandler 中的受控逻辑
        const controlledValue = getControlledValue(node);
        if (controlledValue &&
            newProps.hasOwnProperty(controlledValue)) {
            const handleChangeEvent = ['INPUT', 'TEXTAREA'].includes(getComponentName(node)) ? 'input' : 'change';
            node.__events || (node.__events = {});
            if (!node.__events.hasOwnProperty(handleChangeEvent)) {
                syncEvent(node, handleChangeEvent, function () { });
            }
        }
    }
};
function applyUnControlledDefaultValue(node, props) {
    const controlledValue = getControlledValue(node);
    // 不是可以受控的表单组件，直接返回
    if (!controlledValue)
        return;
    const defaultValueName = 'default' + controlledValue.charAt(0).toUpperCase() + controlledValue.slice(1);
    if (!props.hasOwnProperty(controlledValue) && props.hasOwnProperty(defaultValueName)) {
        // 如果是可以受控的表单组件，当没有传入 value/checked 而是传入 defaultValue/defaultChecked 时，把表单值初始化为 defaultValue/defaultChecked
        node[controlledValue] = props[defaultValueName];
        node.setAttribute(controlledValue, props[defaultValueName]);
    }
}

export { applyUnControlledDefaultValue, attachProps, getClassName, isCoveredByReact, syncEvent };
//# sourceMappingURL=attachProps.js.map
