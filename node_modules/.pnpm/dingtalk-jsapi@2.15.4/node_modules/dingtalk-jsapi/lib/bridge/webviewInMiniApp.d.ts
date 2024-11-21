declare global {
    var AlipayJSBridge: {
        call: (...param: any[]) => void;
    };
}
import { IJSBridge } from '../modelDef';
declare const webviewInMiniappBridge: IJSBridge;
export default webviewInMiniappBridge;
