import Taro from '@tarojs/api';
declare const getLocation: (options?: Partial<Taro.getLocation.Option>, ...args: any[]) => Promise<Taro.getLocation.SuccessCallbackResult>;
export { getLocation };
