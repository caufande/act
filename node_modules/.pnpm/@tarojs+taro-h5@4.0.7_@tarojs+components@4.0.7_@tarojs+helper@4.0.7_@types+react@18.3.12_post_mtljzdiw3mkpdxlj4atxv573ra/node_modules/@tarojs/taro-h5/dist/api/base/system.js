import { __awaiter } from 'tslib';
import platform from 'platform';
import { temporarilyNotSupport } from '../../utils/index.js';
import { MethodHandler } from '../../utils/handler.js';

/** 跳转系统蓝牙设置页 */
const openSystemBluetoothSetting = /* @__PURE__ */ temporarilyNotSupport('openSystemBluetoothSetting');
/** 跳转系统微信授权管理页 */
const openAppAuthorizeSetting = /* @__PURE__ */ temporarilyNotSupport('openAppAuthorizeSetting');
/** 获取窗口信息 */
const getWindowInfo = () => {
    const info = {
        /** 设备像素比 */
        pixelRatio: window.devicePixelRatio,
        /** 屏幕宽度，单位px */
        screenWidth: window.screen.width,
        /** 屏幕高度，单位px */
        screenHeight: window.screen.height,
        /** 可使用窗口宽度，单位px */
        windowWidth: document.documentElement.clientWidth,
        /** 可使用窗口高度，单位px */
        windowHeight: document.documentElement.clientHeight,
        /** 状态栏的高度，单位px */
        statusBarHeight: NaN,
        /** 在竖屏正方向下的安全区域 */
        safeArea: {
            bottom: 0,
            height: 0,
            left: 0,
            right: 0,
            top: 0,
            width: 0
        }
    };
    return info;
};
/** 获取设备设置 */
const getSystemSetting = () => {
    const isLandscape = window.screen.width >= window.screen.height;
    const info = {
        /** 蓝牙的系统开关 */
        bluetoothEnabled: false,
        /** 地理位置的系统开关 */
        locationEnabled: false,
        /** Wi-Fi 的系统开关 */
        wifiEnabled: false,
        /** 设备方向 */
        deviceOrientation: isLandscape ? 'landscape' : 'portrait'
    };
    return info;
};
/** 获取设备设置 */
const getDeviceInfo = () => {
    var _a, _b;
    const info = {
        /** 应用二进制接口类型（仅 Android 支持） */
        abi: '',
        /** 设备二进制接口类型（仅 Android 支持） */
        deviceAbi: '',
        /** 设备性能等级（仅Android小游戏）。取值为：-2 或 0（该设备无法运行小游戏），-1（性能未知），>=1（设备性能值，该值越高，设备性能越好，目前最高不到50） */
        benchmarkLevel: -1,
        /** 设备品牌 */
        brand: platform.manufacturer || 'unknown',
        /** 设备型号 */
        model: platform.product || 'unknown',
        /** 操作系统及版本 */
        system: ((_a = platform.os) === null || _a === void 0 ? void 0 : _a.toString()) || 'unknown',
        /** 客户端平台 */
        platform: ((_b = platform.os) === null || _b === void 0 ? void 0 : _b.family) || 'unknown',
        /** 设备二进制接口类型（仅 Android 支持） */
        CPUType: '',
    };
    return info;
};
/** 获取微信APP基础信息 */
const getAppBaseInfo = () => {
    var _a;
    let isDarkMode = false;
    if ((_a = window.matchMedia) === null || _a === void 0 ? void 0 : _a.call(window, '(prefers-color-scheme: dark)').matches) {
        isDarkMode = true;
    }
    const info = {
        /** 客户端基础库版本 */
        SDKVersion: '',
        /** 是否已打开调试。可通过右上角菜单或 [Taro.setEnableDebug](/docs/apis/base/debug/setEnableDebug) 打开调试。 */
        enableDebug: process.env.NODE_ENV !== 'production',
        /** 当前小程序运行的宿主环境 */
        // host: { appId: '' },
        /** 微信设置的语言 */
        language: navigator.language,
        /** 微信版本号 */
        version: '',
        /** 系统当前主题，取值为light或dark，全局配置"darkmode":true时才能获取，否则为 undefined （不支持小游戏） */
        theme: isDarkMode ? 'dark' : 'light'
    };
    return info;
};
/** 获取微信APP授权设置 */
const getAppAuthorizeSetting = () => {
    const info = {
        /** 允许微信使用相册的开关（仅 iOS 有效） */
        albumAuthorized: 'not determined',
        /** 允许微信使用蓝牙的开关（仅 iOS 有效） */
        bluetoothAuthorized: 'not determined',
        /** 允许微信使用摄像头的开关 */
        cameraAuthorized: 'not determined',
        /** 允许微信使用定位的开关 */
        locationAuthorized: 'not determined',
        /** 定位准确度。true 表示模糊定位，false 表示精确定位（仅 iOS 有效） */
        locationReducedAccuracy: false,
        /** 允许微信使用麦克风的开关 */
        microphoneAuthorized: 'not determined',
        /** 允许微信通知的开关 */
        notificationAuthorized: 'not determined',
        /** 允许微信通知带有提醒的开关（仅 iOS 有效） */
        notificationAlertAuthorized: 'not determined',
        /** 允许微信通知带有标记的开关（仅 iOS 有效） */
        notificationBadgeAuthorized: 'not determined',
        /** 允许微信通知带有声音的开关（仅 iOS 有效） */
        notificationSoundAuthorized: 'not determined',
        /** 允许微信使用日历的开关 */
        phoneCalendarAuthorized: 'not determined'
    };
    return info;
};
/** 获取设备设置 */
const getSystemInfoSync = () => {
    const windowInfo = getWindowInfo();
    const systemSetting = getSystemSetting();
    const deviceInfo = getDeviceInfo();
    const appBaseInfo = getAppBaseInfo();
    const appAuthorizeSetting = getAppAuthorizeSetting();
    delete deviceInfo.abi;
    const info = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, windowInfo), systemSetting), deviceInfo), appBaseInfo), { 
        /** 用户字体大小（单位px）。以微信客户端「我-设置-通用-字体大小」中的设置为准 */
        fontSizeSetting: NaN, 
        /** 允许微信使用相册的开关（仅 iOS 有效） */
        albumAuthorized: appAuthorizeSetting.albumAuthorized === 'authorized', 
        /** 允许微信使用摄像头的开关 */
        cameraAuthorized: appAuthorizeSetting.cameraAuthorized === 'authorized', 
        /** 允许微信使用定位的开关 */
        locationAuthorized: appAuthorizeSetting.locationAuthorized === 'authorized', 
        /** 允许微信使用麦克风的开关 */
        microphoneAuthorized: appAuthorizeSetting.microphoneAuthorized === 'authorized', 
        /** 允许微信通知的开关 */
        notificationAuthorized: appAuthorizeSetting.notificationAuthorized === 'authorized', 
        /** 允许微信通知带有提醒的开关（仅 iOS 有效） */
        notificationAlertAuthorized: appAuthorizeSetting.notificationAlertAuthorized === 'authorized', 
        /** 允许微信通知带有标记的开关（仅 iOS 有效） */
        notificationBadgeAuthorized: appAuthorizeSetting.notificationBadgeAuthorized === 'authorized', 
        /** 允许微信通知带有声音的开关（仅 iOS 有效） */
        notificationSoundAuthorized: appAuthorizeSetting.notificationSoundAuthorized === 'authorized', 
        /** 允许微信使用日历的开关 */
        phoneCalendarAuthorized: appAuthorizeSetting.phoneCalendarAuthorized === 'authorized', 
        /** `true` 表示模糊定位，`false` 表示精确定位，仅 iOS 支持 */
        locationReducedAccuracy: appAuthorizeSetting.locationReducedAccuracy, 
        /** 小程序当前运行环境 */
        environment: '' });
    return info;
};
/** 获取系统信息 */
const getSystemInfoAsync = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (options = {}) {
    const { success, fail, complete } = options;
    const handle = new MethodHandler({ name: 'getSystemInfoAsync', success, fail, complete });
    try {
        const info = yield getSystemInfoSync();
        return handle.success(info);
    }
    catch (error) {
        return handle.fail({
            errMsg: error
        });
    }
});
/** 获取系统信息 */
const getSystemInfo = (...args_2) => __awaiter(void 0, [...args_2], void 0, function* (options = {}) {
    const { success, fail, complete } = options;
    const handle = new MethodHandler({ name: 'getSystemInfo', success, fail, complete });
    try {
        const info = yield getSystemInfoSync();
        return handle.success(info);
    }
    catch (error) {
        return handle.fail({
            errMsg: error
        });
    }
});
const getSkylineInfoSync = /* @__PURE__ */ temporarilyNotSupport('getSkylineInfoSync');
const getSkylineInfo = /* @__PURE__ */ temporarilyNotSupport('getSkylineInfo');
const getRendererUserAgent = /* @__PURE__ */ temporarilyNotSupport('getRendererUserAgent');

export { getAppAuthorizeSetting, getAppBaseInfo, getDeviceInfo, getRendererUserAgent, getSkylineInfo, getSkylineInfoSync, getSystemInfo, getSystemInfoAsync, getSystemInfoSync, getSystemSetting, getWindowInfo, openAppAuthorizeSetting, openSystemBluetoothSetting };
//# sourceMappingURL=system.js.map
