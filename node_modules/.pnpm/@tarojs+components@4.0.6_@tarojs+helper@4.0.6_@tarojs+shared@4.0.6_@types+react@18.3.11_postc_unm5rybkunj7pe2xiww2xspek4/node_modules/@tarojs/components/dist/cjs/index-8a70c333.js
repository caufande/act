'use strict';

function throttle(fn, threshold = 250, scope) {
  let lastTime = 0;
  let deferTimer;
  return function (...args) {
    const context = scope || this;
    const now = Date.now();
    if (now - lastTime > threshold) {
      fn.apply(this, args);
      lastTime = now;
    }
    else {
      clearTimeout(deferTimer);
      deferTimer = setTimeout(() => {
        lastTime = now;
        fn.apply(context, args);
      }, threshold);
    }
  };
}
function debounce(fn, ms = 250, scope) {
  let timer;
  return function (...args) {
    const context = scope || this;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, ms);
  };
}
function isVisible(e) {
  return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
}
function isElement(e) {
  return typeof HTMLElement === 'object'
    ? e instanceof HTMLElement
    : e && typeof e === 'object' && e !== null && e.nodeType === 1 && typeof e.nodeName === 'string';
}

exports.debounce = debounce;
exports.isElement = isElement;
exports.isVisible = isVisible;
exports.throttle = throttle;
