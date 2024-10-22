export declare function syncEvent(el: HTMLElement & {
    __events?: {
        [key: string]: ((e: Event) => any) | undefined;
    };
}, propName: string, propValue: any): void;
export declare function syncAttribute(el: HTMLElement, attribute: string, value: any): void;
