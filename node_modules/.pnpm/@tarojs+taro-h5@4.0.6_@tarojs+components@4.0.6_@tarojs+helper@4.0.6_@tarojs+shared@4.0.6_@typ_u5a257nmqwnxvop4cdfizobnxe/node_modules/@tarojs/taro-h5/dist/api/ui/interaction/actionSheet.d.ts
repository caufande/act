declare class ActionSheet {
    options: {
        alertText: string;
        itemList: never[];
        itemColor: string;
        success: () => void;
        fail: () => void;
        complete: () => void;
    };
    style: {
        maskStyle: {
            position: string;
            'z-index': string;
            top: string;
            right: string;
            left: string;
            bottom: string;
            background: string;
        };
        actionSheetStyle: {
            'z-index': string;
            position: string;
            left: string;
            bottom: string;
            '-webkit-transform': string;
            transform: string;
            width: string;
            'line-height': string;
            background: string;
            '-webkit-transition': string;
            transition: string;
            'border-radius': string;
        };
        menuStyle: {
            'background-color': string;
            'border-radius': string;
        };
        cellStyle: {
            position: string;
            padding: string;
            'text-align': string;
            'font-size': string;
        };
        titleStyle: {
            position: string;
            padding: string;
            'text-align': string;
            'font-size': string;
            color: string;
            display: string;
        };
        cancelStyle: {
            'margin-top': string;
            padding: string;
            'text-align': string;
            'font-size': string;
            color: string;
            'background-color': string;
        };
    };
    lastConfig: {};
    el: HTMLDivElement;
    mask: HTMLDivElement;
    actionSheet: HTMLDivElement;
    menu: HTMLDivElement;
    cells: HTMLDivElement[];
    title: HTMLDivElement;
    cancel: HTMLDivElement;
    hideOpacityTimer: ReturnType<typeof setTimeout>;
    hideDisplayTimer: ReturnType<typeof setTimeout>;
    create(options?: {}): Promise<string | number>;
    show(options?: {}): Promise<string | number>;
    hide(): void;
}
export { ActionSheet as default };
