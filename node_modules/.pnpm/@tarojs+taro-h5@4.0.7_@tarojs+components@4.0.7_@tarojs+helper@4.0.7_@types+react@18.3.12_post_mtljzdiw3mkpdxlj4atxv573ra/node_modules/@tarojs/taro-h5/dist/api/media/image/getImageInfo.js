import { shouldBeObject } from '../../../utils/index.js';
import { MethodHandler } from '../../../utils/handler.js';

/**
 * 获取图片信息。网络图片需先配置download域名才能生效。
 */
const getImageInfo = (options) => {
    // options must be an Object
    const isObject = shouldBeObject(options);
    if (!isObject.flag) {
        const res = { errMsg: `getImageInfo:fail ${isObject.msg}` };
        console.error(res.errMsg);
        return Promise.reject(res);
    }
    const getBase64Image = (image) => {
        try {
            const canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;
            const ctx = canvas.getContext('2d');
            ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(image, 0, 0, image.width, image.height);
            return canvas.toDataURL('image/png');
        }
        catch (e) {
            console.error('getImageInfo:get base64 fail', e);
        }
    };
    const { src, success, fail, complete } = options;
    const handle = new MethodHandler({ name: 'getImageInfo', success, fail, complete });
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.crossOrigin = '';
        image.onload = () => {
            handle.success({
                width: image.naturalWidth,
                height: image.naturalHeight,
                path: getBase64Image(image) || src
            }, { resolve, reject });
        };
        image.onerror = (e) => {
            handle.fail({
                errMsg: e.message
            }, { resolve, reject });
        };
        image.src = src;
    });
};

export { getImageInfo };
//# sourceMappingURL=getImageInfo.js.map
