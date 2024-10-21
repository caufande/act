import { shouldBeObject, getParameterError } from '../../../utils/index.js';
import { MethodHandler } from '../../../utils/handler.js';
import { createDownload } from '../../../utils/helper.js';

const saveVideoToPhotosAlbum = (options) => {
    const methodName = 'saveVideoToPhotosAlbum';
    // options must be an Object
    const isObject = shouldBeObject(options);
    if (!isObject.flag) {
        const res = { errMsg: `${methodName}:fail ${isObject.msg}` };
        console.error(res.errMsg);
        return Promise.reject(res);
    }
    const { filePath, success, fail, complete, } = options;
    const handle = new MethodHandler({ name: methodName, success, fail, complete });
    if (typeof filePath !== 'string') {
        return handle.fail({
            errMsg: getParameterError({
                para: 'filePath',
                correct: 'String',
                wrong: filePath
            })
        });
    }
    createDownload(filePath);
    return handle.success();
};

export { saveVideoToPhotosAlbum };
//# sourceMappingURL=saveVideoToPhotosAlbum.js.map
