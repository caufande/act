import { fromByteArray, toByteArray } from 'base64-js';
export { getUserCryptoManager } from './crypto.js';
export { getLogManager, getRealtimeLogManager, setEnableDebug } from './debug.js';
export { getPerformance, preloadAssets, preloadSkylineView, preloadWebview, reportPerformance } from './performance.js';
export { getAppAuthorizeSetting, getAppBaseInfo, getDeviceInfo, getRendererUserAgent, getSkylineInfo, getSkylineInfoSync, getSystemInfo, getSystemInfoAsync, getSystemInfoSync, getSystemSetting, getWindowInfo, openAppAuthorizeSetting, openSystemBluetoothSetting } from './system.js';
export { getUpdateManager, updateWeChatApp } from './update.js';
export { offAppHide, offAppShow, offAudioInterruptionBegin, offAudioInterruptionEnd, offError, offLazyLoadError, offPageNotFound, offThemeChange, offUnhandledRejection, onAppHide, onAppShow, onAudioInterruptionBegin, onAudioInterruptionEnd, onError, onLazyLoadError, onPageNotFound, onThemeChange, onUnhandledRejection } from './weapp/app-event.js';
export { getEnterOptionsSync, getLaunchOptionsSync } from './weapp/life-cycle.js';

const env = {
    FRAMEWORK: process.env.FRAMEWORK,
    TARO_ENV: process.env.TARO_ENV,
    TARO_PLATFORM: process.env.TARO_PLATFORM,
    TARO_VERSION: process.env.TARO_VERSION,
};
// Note: 该方法由 taro-plugin-platform-h5 实现
// export const canIUse = /* @__PURE__ */ temporarilyNotSupport('canIUse')
function arrayBufferToBase64(arrayBuffer) {
    return fromByteArray(arrayBuffer);
}
function base64ToArrayBuffer(base64) {
    return toByteArray(base64).buffer;
}

export { arrayBufferToBase64, base64ToArrayBuffer, env };
//# sourceMappingURL=index.js.map
