declare global {
    var __weex_require__: any;
    var weex: {
        config: any;
        requireModule(name: string): {
            [key: string]: any;
        };
    };
}
export declare const requireModule: (moduleName: string) => any;
export declare const iosWeexBridge: () => Promise<(method: string, params: any) => Promise<unknown>>;
export declare const androidWeexBridge: () => Promise<(method: string, params: any) => Promise<unknown>>;
