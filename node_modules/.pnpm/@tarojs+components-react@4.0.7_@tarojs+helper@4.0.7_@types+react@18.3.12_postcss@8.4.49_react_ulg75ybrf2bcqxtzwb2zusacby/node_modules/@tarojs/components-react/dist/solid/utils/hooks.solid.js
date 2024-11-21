import { __awaiter } from 'tslib';
import Solid from 'solid-js';

const useState = (value, options) => {
  const [state, setState] = Solid.createSignal(value, options);
  return [state, setState];
};
const useCallback = (callback, deps) => {
  const [_, setSignal] = Solid.createSignal(0); // eslint-disable-line @typescript-eslint/no-unused-vars
  Solid.createEffect(() => {
    deps.forEach(dep => typeof dep === 'function' ? dep() : dep);
    setSignal(s => s + 1);
  });
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return __awaiter(void 0, void 0, void 0, function* () {
      Solid.createEffect(() => {
        const clean = callback(...args);
        return typeof clean === 'function' && Solid.onCleanup(clean);
      });
    });
  };
};
const useEffect = (effect, deps) => {
  Solid.createEffect(() => {
    const cleanup = effect();
    deps.forEach(dep => dep);
    return () => {
      if (typeof cleanup === 'function') cleanup();
    };
  });
};
const useMemo = Solid.createMemo;
const useRef = init => {
  const [state] = Solid.createSignal(init);
  return {
    current: state()
  };
};
const createContext = Solid.createContext;
const useContext = Solid.useContext;
const memo = (component, _propsAreEqual) => component; // eslint-disable-line @typescript-eslint/no-unused-vars
const forwardRef = component => component;
const useImperativeHandle = (ref, createHandle, deps) => {
  Solid.createEffect(() => {
    deps.forEach(dep => dep);
    ref.current = createHandle();
  });
};

export { createContext, forwardRef, memo, useCallback, useContext, useEffect, useImperativeHandle, useMemo, useRef, useState };
//# sourceMappingURL=hooks.solid.js.map
