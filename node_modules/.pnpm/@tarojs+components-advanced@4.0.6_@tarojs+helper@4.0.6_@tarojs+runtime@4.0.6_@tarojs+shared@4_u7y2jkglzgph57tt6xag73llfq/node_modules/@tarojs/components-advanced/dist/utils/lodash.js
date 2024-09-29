function omit(obj = {}, fields = []) {
    const shallow = Object.assign({}, obj);
    fields.forEach((key) => {
        delete shallow[key];
    });
    return shallow;
}
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

export { debounce, omit, throttle };
//# sourceMappingURL=lodash.js.map
