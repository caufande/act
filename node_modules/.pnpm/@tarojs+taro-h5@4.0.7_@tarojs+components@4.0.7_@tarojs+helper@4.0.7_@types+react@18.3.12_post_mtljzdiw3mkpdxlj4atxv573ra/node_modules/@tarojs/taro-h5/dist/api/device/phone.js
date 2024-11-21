import { shouldBeObject, getParameterError } from '../../utils/index.js';
import { MethodHandler } from '../../utils/handler.js';

const makePhoneCall = (options) => {
    // options must be an Object
    const isObject = shouldBeObject(options);
    if (!isObject.flag) {
        const res = { errMsg: `makePhoneCall:fail ${isObject.msg}` };
        console.error(res.errMsg);
        return Promise.reject(res);
    }
    const { phoneNumber, success, fail, complete } = options;
    const handle = new MethodHandler({ name: 'makePhoneCall', success, fail, complete });
    if (typeof phoneNumber !== 'string') {
        return handle.fail({
            errMsg: getParameterError({
                para: 'phoneNumber',
                correct: 'String',
                wrong: phoneNumber
            })
        });
    }
    window.location.href = `tel:${phoneNumber}`;
    return handle.success();
};

export { makePhoneCall };
//# sourceMappingURL=phone.js.map
