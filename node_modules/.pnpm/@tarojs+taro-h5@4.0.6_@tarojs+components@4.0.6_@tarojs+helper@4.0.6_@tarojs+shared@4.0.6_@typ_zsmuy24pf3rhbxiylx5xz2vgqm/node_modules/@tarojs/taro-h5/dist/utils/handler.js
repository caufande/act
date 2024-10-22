import { isFunction } from '@tarojs/shared';

class MethodHandler {
    constructor({ name, success, fail, complete }) {
        this.isHandlerError = false;
        this.methodName = name;
        this.__success = success;
        this.__fail = fail;
        this.__complete = complete;
        this.isHandlerError = isFunction(this.__complete) || isFunction(this.__fail);
    }
    success(res = {}, promise = {}) {
        if (!res.errMsg) {
            res.errMsg = `${this.methodName}:ok`;
        }
        isFunction(this.__success) && this.__success(res);
        isFunction(this.__complete) && this.__complete(res);
        const { resolve = Promise.resolve.bind(Promise) } = promise;
        return resolve(res);
    }
    fail(res = {}, promise = {}) {
        if (!res.errMsg) {
            res.errMsg = `${this.methodName}:fail`;
        }
        else {
            res.errMsg = `${this.methodName}:fail ${res.errMsg}`;
        }
        isFunction(this.__fail) && this.__fail(res);
        isFunction(this.__complete) && this.__complete(res);
        const { resolve = Promise.resolve.bind(Promise), reject = Promise.reject.bind(Promise) } = promise;
        return this.isHandlerError
            ? resolve(res)
            : reject(res);
    }
}
class CallbackManager {
    constructor() {
        this.callbacks = [];
        /** 添加回调 */
        this.add = (opt) => {
            if (opt)
                this.callbacks.push(opt);
        };
        /** 移除回调 */
        this.remove = (opt) => {
            if (opt) {
                let pos = -1;
                this.callbacks.forEach((callback, k) => {
                    if (callback === opt) {
                        pos = k;
                    }
                });
                if (pos > -1) {
                    this.callbacks.splice(pos, 1);
                }
            }
            else {
                // Note: 参数为空，则取消所有的事件监听
                this.callbacks = [];
            }
        };
        /** 获取回调函数数量 */
        this.count = () => {
            return this.callbacks.length;
        };
        /** 触发回调 */
        this.trigger = (...args) => {
            this.callbacks.forEach(opt => {
                if (isFunction(opt)) {
                    opt(...args);
                }
                else {
                    const { callback, ctx } = opt;
                    isFunction(callback) && callback.call(ctx, ...args);
                }
            });
        };
        /** 清空所有回调 */
        this.clear = () => {
            this.callbacks = [];
        };
    }
}

export { CallbackManager, MethodHandler };
//# sourceMappingURL=handler.js.map
