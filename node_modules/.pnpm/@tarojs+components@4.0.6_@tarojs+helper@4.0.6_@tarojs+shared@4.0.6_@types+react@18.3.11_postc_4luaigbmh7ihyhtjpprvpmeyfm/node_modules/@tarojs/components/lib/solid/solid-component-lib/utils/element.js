import { isObject } from '@tarojs/shared';
import { setAttribute } from 'solid-js/web';

function syncEvent(el, propName, propValue) {
    const eventName = propName.substring(2)[0].toLowerCase() + propName.substring(3);
    const eventStore = el.__events || (el.__events = {});
    const oldEventHandler = eventStore[eventName];
    if (oldEventHandler) {
        el.removeEventListener(eventName, oldEventHandler);
    }
    el.addEventListener(eventName, (eventStore[eventName] = function handler(e) {
        if (propValue) {
            propValue.call(this, e);
        }
    }));
}
function syncAttribute(el, attribute, value) {
    if (attribute === 'style') {
        if (isObject(value)) {
            value = Object.keys(value).reduce((acc, key) => {
                acc.push(`${key}: ${value[key]}`);
                return acc;
            }, []).join(';');
        }
        el.style.cssText = value;
    }
    else if (attribute === 'classList') {
        const [addList, removeList] = [[], []];
        if (isObject(value)) {
            for (const k in value) {
                if (value[k]) {
                    addList.push(k);
                }
                else {
                    removeList.push(k);
                }
            }
            el.classList.add(...addList);
            el.classList.remove(...removeList);
        }
    }
    else {
        setAttribute(el, attribute, value);
    }
}

export { syncAttribute, syncEvent };
//# sourceMappingURL=element.js.map
