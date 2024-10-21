import { __rest } from 'tslib';
import { shouldBeObject } from '../../../utils/index.js';
import { chooseMedia } from '../video/chooseMedia.js';

/**
 * 从本地相册选择图片或使用相机拍照。
 * @deprecated 请使用 chooseMedia 接口
 */
const chooseImage = function (options) {
    // options must be an Object
    const isObject = shouldBeObject(options);
    if (!isObject.flag) {
        const res = { errMsg: `chooseImage:fail ${isObject.msg}` };
        console.error(res.errMsg);
        return Promise.reject(res);
    }
    let camera = 'back';
    const { sourceType = ['album', 'camera'], success, complete, fail } = options, args = __rest(options, ["sourceType", "success", "complete", "fail"]);
    if (sourceType.includes('camera') && sourceType.indexOf('user') > -1) {
        camera = 'front';
    }
    function parseRes(res) {
        const { tempFiles = [], errMsg } = res;
        return {
            tempFilePaths: tempFiles.map(item => item.tempFilePath),
            tempFiles: tempFiles.map(item => ({
                path: item.tempFilePath,
                size: item.size,
                type: item.fileType,
                originalFileObj: item.originalFileObj,
            })),
            errMsg,
        };
    }
    return chooseMedia(Object.assign(Object.assign({ mediaId: 'taroChooseImage' }, args), { sourceType: sourceType, mediaType: ['image'], camera, success: (res) => {
            const param = parseRes(res);
            success === null || success === void 0 ? void 0 : success(param);
            complete === null || complete === void 0 ? void 0 : complete(param);
        }, fail: (err) => {
            fail === null || fail === void 0 ? void 0 : fail(err);
            complete === null || complete === void 0 ? void 0 : complete(err);
        } }), 'chooseImage').then(parseRes);
};

export { chooseImage };
//# sourceMappingURL=chooseImage.js.map
