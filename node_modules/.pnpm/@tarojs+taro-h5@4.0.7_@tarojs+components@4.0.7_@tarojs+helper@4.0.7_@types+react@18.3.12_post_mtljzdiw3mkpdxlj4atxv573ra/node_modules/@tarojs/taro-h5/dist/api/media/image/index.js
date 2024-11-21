import { temporarilyNotSupport, permanentlyNotSupport } from '../../../utils/index.js';
export { saveImageToPhotosAlbum } from './saveImageToPhotosAlbum.js';
export { getImageInfo } from './getImageInfo.js';
export { previewImage } from './previewImage.js';
export { chooseImage } from './chooseImage.js';

const previewMedia = /* @__PURE__ */ temporarilyNotSupport('previewMedia');
const compressImage = /* @__PURE__ */ temporarilyNotSupport('compressImage');
const chooseMessageFile = /* @__PURE__ */ permanentlyNotSupport('chooseMessageFile');
const editImage = /* @__PURE__ */ temporarilyNotSupport('editImage');
const cropImage = /* @__PURE__ */ temporarilyNotSupport('cropImage');

export { chooseMessageFile, compressImage, cropImage, editImage, previewMedia };
//# sourceMappingURL=index.js.map
