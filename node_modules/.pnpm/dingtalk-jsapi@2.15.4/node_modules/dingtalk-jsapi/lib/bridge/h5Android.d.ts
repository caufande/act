export declare type IAndroidBridge = (successCallback: any, failCallback: any, pre: string, suff: string, params: any) => void;
export interface IAndroidNuva {
    require: () => IAndroidBridge;
    isReady: boolean | undefined;
}
declare global {
    var nuva: IAndroidNuva | undefined;
    var WebViewJavascriptBridgeAndroid: IAndroidBridge | undefined;
    interface Window {
        nuva: IAndroidNuva | undefined;
        WebViewJavascriptBridgeAndroid: IAndroidBridge | undefined;
    }
}
import { IJSBridge } from '../modelDef';
export declare const h5AndroidbridgeInit: () => Promise<{}>;
declare const h5AndroidBridge: IJSBridge;
export default h5AndroidBridge;
