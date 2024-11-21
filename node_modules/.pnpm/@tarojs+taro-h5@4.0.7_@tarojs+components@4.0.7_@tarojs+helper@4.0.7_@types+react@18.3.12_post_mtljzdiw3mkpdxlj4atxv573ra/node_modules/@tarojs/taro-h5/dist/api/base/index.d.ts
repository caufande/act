declare const env: {
    FRAMEWORK: string | undefined;
    TARO_ENV: string | undefined;
    TARO_PLATFORM: string | undefined;
    TARO_VERSION: string | undefined;
};
declare function arrayBufferToBase64(arrayBuffer: ArrayBuffer): string;
declare function base64ToArrayBuffer(base64: string): ArrayBufferLike;
export { env, arrayBufferToBase64, base64ToArrayBuffer };
export * from "./crypto.js";
export * from "./debug.js";
export * from "./performance.js";
export * from "./system.js";
export * from "./update.js";
export * from "./weapp/app-event.js";
export * from "./weapp/life-cycle.js";
