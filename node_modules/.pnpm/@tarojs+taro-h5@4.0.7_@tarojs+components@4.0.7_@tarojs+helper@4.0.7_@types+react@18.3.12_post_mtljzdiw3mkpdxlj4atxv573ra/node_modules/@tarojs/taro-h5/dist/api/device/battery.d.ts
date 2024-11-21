import Taro from '@tarojs/api';
declare const getBatteryInfoSync: (option?: {}, ...args: any[]) => Promise<Partial<TaroGeneral.CallbackResult> & Record<string, unknown> & TaroGeneral.CallbackResult>;
declare const getBatteryInfo: typeof Taro.getBatteryInfo;
export { getBatteryInfoSync, getBatteryInfo };
