import Taro from '@tarojs/api';
declare class MediaQueryObserver implements Taro.MediaQueryObserver {
    private _mediaQueryObserver;
    private _listener;
    // 监听页面媒体查询变化情况
    observe(descriptor: Taro.MediaQueryObserver.descriptor, callback: Taro.MediaQueryObserver.observeCallback): void;
    // 停止监听，销毁媒体查询对象
    disconnect(): void;
}
export { MediaQueryObserver };
