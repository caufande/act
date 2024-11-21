import { shouldBeObject } from '../../../utils/index.js';
import { chooseMedia } from './chooseMedia.js';

/**
 * 拍摄视频或从手机相册中选视频。
 * @deprecated 请使用 chooseMedia 接口
 */
const chooseVideo = (options) => {
    // options must be an Object
    const isObject = shouldBeObject(options);
    if (!isObject.flag) {
        const res = { errMsg: `chooseVideo:fail ${isObject.msg}` };
        console.error(res.errMsg);
        return Promise.reject(res);
    }
    const { sourceType = ['album', 'camera'], 
    // TODO 考虑通过 ffmpeg 支持压缩
    // compressed = true,
    maxDuration = 60, camera = 'back', success, fail, complete, } = options;
    function parseRes(res) {
        const { tempFiles = [], errMsg } = res;
        const [video] = tempFiles;
        return Object.assign(Object.assign({}, video), { errMsg });
    }
    return chooseMedia({
        mediaId: 'taroChooseVideo',
        sourceType,
        mediaType: ['video'],
        maxDuration,
        camera,
        success: (res) => {
            const param = parseRes(res);
            success === null || success === void 0 ? void 0 : success(param);
            complete === null || complete === void 0 ? void 0 : complete(param);
        },
        fail: (err) => {
            fail === null || fail === void 0 ? void 0 : fail(err);
            complete === null || complete === void 0 ? void 0 : complete(err);
        },
    }, 'chooseVideo').then(parseRes);
};

export { chooseVideo };
//# sourceMappingURL=chooseVideo.js.map
