import { IENV, IPlatformConfig } from './sdk';
export { ENV_ENUM, APP_TYPE, ENV_ENUM_SUB } from './sdk';
declare global {
    var __dingtalk_jsapi_top_platfrom_config__: IPlatformConfig | undefined;
    interface Navigator {
        swuserAgent: any;
    }
}
export declare const getUA: () => string;
export declare const getENV: () => IENV;
