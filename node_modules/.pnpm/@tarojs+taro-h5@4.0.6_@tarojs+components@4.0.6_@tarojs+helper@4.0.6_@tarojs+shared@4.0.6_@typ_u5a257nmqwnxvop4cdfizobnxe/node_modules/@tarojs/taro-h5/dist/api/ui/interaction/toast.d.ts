declare class Toast {
    options: {
        title: string;
        icon: string;
        image: string;
        duration: number;
        mask: boolean;
    };
    style: {
        maskStyle: {
            position: string;
            'z-index': string;
            top: string;
            right: string;
            left: string;
            bottom: string;
        };
        toastStyle: {
            'z-index': string;
            'box-sizing': string;
            display: string;
            'flex-direction': string;
            'justify-content': string;
            '-webkit-justify-content': string;
            position: string;
            top: string;
            left: string;
            'min-width': string;
            'max-width': string;
            'min-height': string;
            padding: string;
            transform: string;
            'border-radius': string;
            'text-align': string;
            'line-height': string;
            color: string;
            background: string;
        };
        successStyle: {
            margin: string;
            width: string;
            height: string;
            background: string;
            'background-size': string;
        };
        errrorStyle: {
            margin: string;
            width: string;
            height: string;
            background: string;
            'background-size': string;
        };
        loadingStyle: {
            margin: string;
            width: string;
            height: string;
            '-webkit-animation': string;
            animation: string;
            background: string;
            'background-size': string;
        };
        imageStyle: {
            margin: string;
            width: string;
            height: string;
            background: string;
            'background-size': string;
        };
        textStyle: {
            margin: string;
            'font-size': string;
        };
    };
    currentPath: string | null;
    el: HTMLDivElement;
    mask: HTMLDivElement;
    icon: HTMLParagraphElement;
    toast: HTMLDivElement;
    title: HTMLParagraphElement;
    type: any;
    hideOpacityTimer: ReturnType<typeof setTimeout>;
    hideDisplayTimer: ReturnType<typeof setTimeout>;
    create(options?: {}, _type?: 'loading' | 'toast'): string;
    show(options?: {}, _type?: 'loading' | 'toast'): string;
    hide(duration?: number, type?: string): void;
}
export { Toast as default };
