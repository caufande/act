import '../lib/polyfills/objectKeys';
interface IMockData {
    payload: object;
    isSuccess: boolean;
}
declare type IMockFunction = (params: any) => Promise<any>;
/**
 * 一旦调用 init，当前环境下的接口调用将会走 mock 的数据（可选择部分或者全部）
 * @memberof MockApi
 */
export declare const init: (config?: {
    /** 初始化时配置的api，等同于 batchAppendMockApiResult */
    mockApiMap?: {
        [method: string]: IMockData | IMockFunction;
    } | undefined;
    /** 只有当配置了api才会走 mock */
    isOnlyMockWhenConfig?: boolean | undefined;
} | undefined) => void;
export declare const emitEvent: (eventName: string) => void;
export declare const appendMockApiResult: (method: string, result: IMockFunction | IMockData, disableMockFilter?: ((params: any) => boolean) | undefined) => void;
export declare const batchAppendMockApiResult: (mockApiMap: {
    [method: string]: IMockData | IMockFunction;
}) => void;
export {};
