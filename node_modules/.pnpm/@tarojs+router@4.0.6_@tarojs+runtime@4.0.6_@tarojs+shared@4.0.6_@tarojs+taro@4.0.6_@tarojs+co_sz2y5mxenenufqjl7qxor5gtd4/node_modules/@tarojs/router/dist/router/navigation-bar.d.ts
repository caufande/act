import type PageHandler from './page';
interface NavigationBarCache {
    backgroundColor?: string;
    fontColor?: string;
    title?: string;
    show?: boolean;
    loading?: boolean;
}
export default class NavigationBarHandler {
    pageContext: PageHandler;
    navigationBarElement: HTMLElement;
    cache: Record<string, NavigationBarCache>;
    isLoadDdEntry: boolean;
    constructor(pageContext: PageHandler);
    private toHomeFn;
    private backFn;
    get homeBtnElement(): Element | null;
    get backBtnElement(): Element | null;
    get titleElement(): Element | null;
    get loadingElement(): Element | null;
    init(): void;
    setNavigationBarElement(): void;
    load(): void;
    setCacheValue(): void;
    setFnBtnState(): void;
    shiftLoadingState(show: boolean): void;
    setNavigationLoading(show?: boolean): void;
    setNavigationBarBackground(backgroundColor?: string): void;
    setNavigationBarTextStyle(fontColor?: string): void;
    setTitle(title?: any): void;
    fnBtnToggleToHome(): void;
    fnBtnToggleToBack(): void;
    fnBtnToggleToNone(): void;
    setNavigationBarVisible(show?: any): void;
}
export {};
