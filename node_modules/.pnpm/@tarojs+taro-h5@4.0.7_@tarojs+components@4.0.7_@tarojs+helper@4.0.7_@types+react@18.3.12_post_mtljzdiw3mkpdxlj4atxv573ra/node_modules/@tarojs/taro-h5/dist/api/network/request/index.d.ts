import Taro from '@tarojs/api';
declare const request: <T = any, U = any>(option: Taro.request.Option<T, U>) => Taro.RequestTask<T>;
declare const addInterceptor: any;
declare const cleanInterceptors: any;
export { request, addInterceptor, cleanInterceptors };
