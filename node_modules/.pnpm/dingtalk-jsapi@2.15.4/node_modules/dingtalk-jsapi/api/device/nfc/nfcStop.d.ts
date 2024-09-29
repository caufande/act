/**
 * 停止NFC功能的读或写 请求参数定义
 * @apiName device.nfc.nfcStop
 */
export interface IDeviceNfcNfcStopParams {
    [key: string]: any;
}
/**
 * 停止NFC功能的读或写 返回结果定义
 * @apiName device.nfc.nfcStop
 */
export interface IDeviceNfcNfcStopResult {
    [key: string]: any;
}
/**
 * 停止NFC功能的读或写
 * @apiName device.nfc.nfcStop
 * @supportVersion ios: 4.3.9 android: 4.3.9
 */
export declare function nfcStop$(params: IDeviceNfcNfcStopParams): Promise<IDeviceNfcNfcStopResult>;
export default nfcStop$;
