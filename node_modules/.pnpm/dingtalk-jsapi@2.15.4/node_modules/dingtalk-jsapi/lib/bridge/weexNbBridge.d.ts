import { IJSBridge } from '../modelDef';
declare global {
    var AlipayJSBridge: {
        call: (...param: any[]) => void;
    };
}
export declare const weexNbBridge: IJSBridge;
