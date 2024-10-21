const camelToDashCase = (str) => str.replace(/([A-Z])/g, (m) => `-${m[0].toLowerCase()}`);
const isPropNameAnEvent = (propName) => propName.startsWith('on') && propName[2] === propName[2].toUpperCase();
const isReactiveKey = (obj, key) => Object.getOwnPropertyDescriptor(obj, key).get;

export { camelToDashCase, isPropNameAnEvent, isReactiveKey };
//# sourceMappingURL=case.js.map
