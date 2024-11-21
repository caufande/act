import { temporarilyNotSupport, findDOM } from '../../../utils/index.js';
export { saveVideoToPhotosAlbum } from './saveVideoToPhotosAlbum.js';
export { getVideoInfo } from './getVideoInfo.js';
export { chooseMedia } from './chooseMedia.js';
export { chooseVideo } from './chooseVideo.js';

const openVideoEditor = /* @__PURE__ */ temporarilyNotSupport('openVideoEditor');
/**
 * 创建 video 上下文 VideoContext 对象。
 */
const createVideoContext = (id, inst) => {
    const el = findDOM(inst);
    // TODO HTMLVideoElement to VideoContext
    return el === null || el === void 0 ? void 0 : el.querySelector(`taro-video-core[id=${id}]`);
};
const compressVideo = /* @__PURE__ */ temporarilyNotSupport('compressVideo');

export { compressVideo, createVideoContext, openVideoEditor };
//# sourceMappingURL=index.js.map
