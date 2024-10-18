/** 更新转发属性 */
declare const updateShareMenu: (option?: {}, ...args: any[]) => Promise<Partial<TaroGeneral.CallbackResult> & Record<string, unknown> & TaroGeneral.CallbackResult>;
/** 显示当前页面的转发按钮 */
declare const showShareMenu: (option?: {}, ...args: any[]) => Promise<Partial<TaroGeneral.CallbackResult> & Record<string, unknown> & TaroGeneral.CallbackResult>;
/** 打开分享图片弹窗，可以将图片发送给朋友、收藏或下载 */
declare const showShareImageMenu: (option?: {}, ...args: any[]) => Promise<Partial<TaroGeneral.CallbackResult> & Record<string, unknown> & TaroGeneral.CallbackResult>;
/** 转发视频到聊天 */
declare const shareVideoMessage: (option?: {}, ...args: any[]) => Promise<Partial<TaroGeneral.CallbackResult> & Record<string, unknown> & TaroGeneral.CallbackResult>;
/** 转发文件到聊天 */
declare const shareFileMessage: (option?: {}, ...args: any[]) => Promise<Partial<TaroGeneral.CallbackResult> & Record<string, unknown> & TaroGeneral.CallbackResult>;
/** 监听用户点击右上角菜单的「复制链接」按钮时触发的事件 */
declare const onCopyUrl: (option?: {}, ...args: any[]) => Promise<Partial<TaroGeneral.CallbackResult> & Record<string, unknown> & TaroGeneral.CallbackResult>;
/** 移除用户点击右上角菜单的「复制链接」按钮时触发的事件的监听函数 */
declare const offCopyUrl: (option?: {}, ...args: any[]) => Promise<Partial<TaroGeneral.CallbackResult> & Record<string, unknown> & TaroGeneral.CallbackResult>;
/** 隐藏当前页面的转发按钮 */
declare const hideShareMenu: (option?: {}, ...args: any[]) => Promise<Partial<TaroGeneral.CallbackResult> & Record<string, unknown> & TaroGeneral.CallbackResult>;
/** 获取转发详细信息 */
declare const getShareInfo: (option?: {}, ...args: any[]) => Promise<Partial<TaroGeneral.CallbackResult> & Record<string, unknown> & TaroGeneral.CallbackResult>;
/** 验证私密消息。 */
declare const authPrivateMessage: (option?: {}, ...args: any[]) => Promise<Partial<TaroGeneral.CallbackResult> & Record<string, unknown> & TaroGeneral.CallbackResult>;
export { updateShareMenu, showShareMenu, showShareImageMenu, shareVideoMessage, shareFileMessage, onCopyUrl, offCopyUrl, hideShareMenu, getShareInfo, authPrivateMessage };
