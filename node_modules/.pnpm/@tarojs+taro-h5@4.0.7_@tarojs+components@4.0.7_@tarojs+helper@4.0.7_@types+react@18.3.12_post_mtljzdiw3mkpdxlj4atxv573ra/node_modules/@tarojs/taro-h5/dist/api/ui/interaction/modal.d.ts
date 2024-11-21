declare class Modal {
    options: {
        title: string;
        content: string;
        showCancel: boolean;
        cancelText: string;
        cancelColor: string;
        confirmText: string;
        confirmColor: string;
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
        modalStyle: {
            'z-index': string;
            position: string;
            top: string;
            left: string;
            transform: string;
            width: string;
            'max-width': string;
            'border-radius': string;
            'text-align': string;
            'line-height': string;
            overflow: string;
            background: string;
        };
        titleStyle: {
            padding: string;
            'font-size': string;
        };
        textStyle: {
            padding: string;
            'min-height': string;
            'font-size': string;
            'line-height': string;
            color: string;
            'word-wrap': string;
            'word-break': string;
        };
        footStyle: {
            position: string;
            'line-height': string;
            'font-size': string;
            display: string;
        };
        btnStyle: {
            position: string;
            '-webkit-box-flex': string;
            '-webkit-flex': string;
            flex: string;
        };
    };
    currentPath: string | null;
    el: HTMLDivElement;
    title: HTMLDivElement;
    text: HTMLDivElement;
    cancel: HTMLDivElement;
    confirm: HTMLDivElement;
    hideOpacityTimer: ReturnType<typeof setTimeout>;
    hideDisplayTimer: ReturnType<typeof setTimeout>;
    create(options?: {}): Promise<string>;
    show(options?: {}): Promise<string>;
    hide(): void;
}
export { Modal as default };
