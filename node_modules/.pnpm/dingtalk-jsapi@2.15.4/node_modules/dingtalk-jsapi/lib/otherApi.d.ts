/**
 * @deprecated 兼容老接口，可用 `dd.env.platform === 'ios'` 代替
 */
export declare const ios: boolean;
/**
 * @deprecated 兼容老接口，可用 `dd.env.platform === 'ios'` 代替
 */
export declare const android: boolean;
/**
 * @deprecated 兼容老接口，可用 `dd.env.platform === 'pc'` 代替
 */
export declare const pc: boolean;
/**
 * @deprecated 兼容老接口，可用 `dd.env.platform === 'notInDingTalk'` 代替
 */
export declare const other: boolean;
/**
 * @deprecated 用于比较版本号，适用于钉钉内业务简易的版本比较
 * 例如3.5.0 > 3.4.9, 而semver的版本号则不支持
 * semver的版本号会忽略tag，例如3.5.0-realse.1 跟 3.5.0-realse.2 相等
 */
export declare const compareVersion: (oldVersion: string, newVersion: string, containEqual: boolean) => boolean;
/**
 * @deprecated recommend use navigator.language to get current language
 */
export declare const language: string | undefined;
/** @deprecated 即容器版本号, 推荐使用 dd.env.version */
export declare const version: string | undefined;
