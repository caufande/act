declare function onLocationChange(callback: Taro.onLocationChange.Callback): void;
declare function offLocationChange(callback: Taro.onLocationChange.Callback): void;
declare function onLocationChangeError(callback: Taro.onLocationChange.Callback): void;
declare function offLocationChangeError(callback: Taro.onLocationChange.Callback): void;
declare const stopLocationUpdate: (options?: Partial<import("@tarojs/taro").stopLocationUpdate.Option>, ...args: any[]) => Promise<TaroGeneral.CallbackResult>;
declare const startLocationUpdate: (options?: Partial<import("@tarojs/taro").startLocationUpdate.Option>, ...args: any[]) => Promise<TaroGeneral.CallbackResult>;
export { onLocationChange, offLocationChange, onLocationChangeError, offLocationChangeError, stopLocationUpdate, startLocationUpdate };
