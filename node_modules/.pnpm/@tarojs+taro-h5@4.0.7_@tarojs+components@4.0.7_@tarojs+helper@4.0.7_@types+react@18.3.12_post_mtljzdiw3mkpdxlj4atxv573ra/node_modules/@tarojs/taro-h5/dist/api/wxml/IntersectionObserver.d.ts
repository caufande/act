import Taro from '@tarojs/api';
type TElement = Document | HTMLElement | Element;
declare class TaroH5IntersectionObserver implements Taro.IntersectionObserver {
    private _component;
    private _options;
    private _observerInst;
    private _listeners;
    private _root;
    private _rootMargin;
    private _isInited;
    protected get container(): TElement;
    constructor(component: TaroGeneral.IAnyObject, options?: Taro.createIntersectionObserver.Option);
    private createInst;
    disconnect(): void;
    observe(targetSelector: string, callback: Taro.IntersectionObserver.ObserveCallback): void;
    relativeTo(selector: string, margins?: Taro.IntersectionObserver.RelativeToMargins | undefined): Taro.IntersectionObserver;
    relativeToViewport(margins?: Taro.IntersectionObserver.RelativeToViewportMargins | undefined): Taro.IntersectionObserver;
    private _getCallbackByElement;
}
export { TaroH5IntersectionObserver };
