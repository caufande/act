declare global {
    var dd: {
        dtBridge: (param: any) => void;
        addDTCustomEventListener: (handler: any) => void;
        removeDTCustomEventListener: (handler: any) => void;
        addDTChannelEventListener: (handler: any) => void;
        removeDTChannelEventListener: (handler: any) => void;
    };
}
import { IJSBridge } from '../modelDef';
declare const eappBridge: IJSBridge;
export default eappBridge;
