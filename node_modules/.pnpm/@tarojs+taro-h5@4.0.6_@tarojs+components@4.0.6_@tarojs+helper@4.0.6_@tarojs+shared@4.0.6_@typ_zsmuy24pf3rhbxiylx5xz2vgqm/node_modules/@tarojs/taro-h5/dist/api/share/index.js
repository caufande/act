import { temporarilyNotSupport, permanentlyNotSupport } from '../../utils/index.js';

// 转发
/** 更新转发属性 */
const updateShareMenu = /* @__PURE__ */ temporarilyNotSupport('updateShareMenu');
/** 显示当前页面的转发按钮 */
const showShareMenu = /* @__PURE__ */ temporarilyNotSupport('showShareMenu');
/** 打开分享图片弹窗，可以将图片发送给朋友、收藏或下载 */
const showShareImageMenu = /* @__PURE__ */ temporarilyNotSupport('showShareImageMenu');
/** 转发视频到聊天 */
const shareVideoMessage = /* @__PURE__ */ temporarilyNotSupport('shareVideoMessage');
/** 转发文件到聊天 */
const shareFileMessage = /* @__PURE__ */ temporarilyNotSupport('shareFileMessage');
/** 监听用户点击右上角菜单的「复制链接」按钮时触发的事件 */
const onCopyUrl = /* @__PURE__ */ temporarilyNotSupport('onCopyUrl');
/** 移除用户点击右上角菜单的「复制链接」按钮时触发的事件的监听函数 */
const offCopyUrl = /* @__PURE__ */ temporarilyNotSupport('offCopyUrl');
/** 隐藏当前页面的转发按钮 */
const hideShareMenu = /* @__PURE__ */ temporarilyNotSupport('hideShareMenu');
/** 获取转发详细信息 */
const getShareInfo = /* @__PURE__ */ temporarilyNotSupport('getShareInfo');
/** 验证私密消息。 */
const authPrivateMessage = /* @__PURE__ */ permanentlyNotSupport('authPrivateMessage');

export { authPrivateMessage, getShareInfo, hideShareMenu, offCopyUrl, onCopyUrl, shareFileMessage, shareVideoMessage, showShareImageMenu, showShareMenu, updateShareMenu };
//# sourceMappingURL=index.js.map
