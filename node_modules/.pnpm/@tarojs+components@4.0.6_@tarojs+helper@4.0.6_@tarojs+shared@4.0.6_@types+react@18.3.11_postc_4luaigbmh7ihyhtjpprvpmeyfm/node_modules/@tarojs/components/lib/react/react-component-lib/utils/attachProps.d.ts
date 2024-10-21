export declare const getClassName: (classList: DOMTokenList, newProps: any, oldProps: any) => string;
export declare const isCoveredByReact: (__eventNameSuffix: string) => boolean;
interface EventCenter {
    [key: string]: EventCenter.EventCallback | undefined;
}
declare namespace EventCenter {
    interface EventCallback {
        (e: Event): any;
        fn?: (e: Event) => any;
    }
}
type HTMLElementWithEvents = HTMLElement & {
    __events?: EventCenter;
};
export declare const syncEvent: (node: HTMLElementWithEvents, eventName: string, newEventHandler?: (e: Event) => any) => void;
export declare const attachProps: (node: HTMLElementWithEvents, newProps: any, oldProps?: any) => void;
export declare function applyUnControlledDefaultValue(node: HTMLElementWithEvents, props: any): void;
export {};
