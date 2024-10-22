import { SocketTask } from "./socketTask.js";
declare function sendSocketMessage(): void;
declare function onSocketOpen(): void;
declare function onSocketMessage(): void;
declare function onSocketError(): void;
declare function onSocketClose(): void;
declare function connectSocket(options?: Taro.connectSocket.Option): Promise<unknown>;
declare function closeSocket(): void;
export { sendSocketMessage, onSocketOpen, onSocketMessage, onSocketError, onSocketClose, connectSocket, closeSocket, SocketTask };
