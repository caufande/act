export interface IIOSBridge {
    init: any;
    registerHandler: any;
    callHandler: any;
}
declare global {
    var WebViewJavascriptBridge: IIOSBridge | undefined;
    interface Window {
        WebViewJavascriptBridge: IIOSBridge | undefined;
    }
}
import { IJSBridge } from '../modelDef';
export declare const h5IosBridgeInit: () => Promise<{}>;
declare const h5IosBridge: IJSBridge;
export default h5IosBridge;
