import Taro from '@tarojs/api';
declare class SocketTask {
    ws: WebSocket;
    CONNECTING: number;
    OPEN: number;
    CLOSING: number;
    CLOSED: number;
    closeDetail: {
        code: any;
        reason: any;
    };
    _destroyWhenClose?: () => void;
    constructor(url: any, protocols: any);
    get readyState(): number;
    send(opts?: Partial<Taro.SocketTask.SendOption>): Promise<{
        errMsg: string;
    }>;
    close(opts?: Partial<Taro.SocketTask.CloseOption>): Promise<{
        errMsg: string;
    }>;
    onOpen(func: any): void;
    onMessage(func: any): void;
    onClose(func: any): void;
    onError(func: any): void;
}
export { SocketTask };
