import { toKebabCase, isFunction } from '@tarojs/shared';

function generateMediaQueryStr(descriptor) {
    const mediaQueryArr = [];
    const descriptorMenu = ['width', 'minWidth', 'maxWidth', 'height', 'minHeight', 'maxHeight', 'orientation'];
    for (const item of descriptorMenu) {
        if (item !== 'orientation' &&
            descriptor[item] &&
            Number(descriptor[item]) >= 0) {
            mediaQueryArr.push(`(${(toKebabCase(item))}: ${Number(descriptor[item])}px)`);
        }
        if (item === 'orientation' && descriptor[item]) {
            mediaQueryArr.push(`(${toKebabCase(item)}: ${descriptor[item]})`);
        }
    }
    return mediaQueryArr.join(' and ');
}
class MediaQueryObserver {
    // 监听页面媒体查询变化情况
    observe(descriptor, callback) {
        if (isFunction(callback)) {
            // 创建媒体查询对象
            this._mediaQueryObserver = window.matchMedia(generateMediaQueryStr(descriptor));
            // 监听器
            this._listener = (ev) => {
                callback({ matches: ev.matches });
            };
            callback({ matches: this._mediaQueryObserver.matches });
            // 兼容旧浏览器中 MediaQueryList 尚未继承于 EventTarget 导致不存在 'addEventListener'
            if ('addEventListener' in this._mediaQueryObserver) {
                this._mediaQueryObserver.addEventListener('change', this._listener);
            }
            else {
                // @ts-ignore
                this._mediaQueryObserver.addListener(this._listener);
            }
        }
    }
    // 停止监听，销毁媒体查询对象
    disconnect() {
        if (this._mediaQueryObserver && this._listener) {
            // 兼容旧浏览器中 MediaQueryList 尚未继承于 EventTarget 导致不存在 'removeEventListener'
            if ('removeEventListener' in this._mediaQueryObserver) {
                this._mediaQueryObserver.removeEventListener('change', this._listener);
            }
            else {
                // @ts-ignore
                this._mediaQueryObserver.removeListener(this._listener);
            }
        }
    }
}

export { MediaQueryObserver };
//# sourceMappingURL=MediaQueryObserver.js.map
