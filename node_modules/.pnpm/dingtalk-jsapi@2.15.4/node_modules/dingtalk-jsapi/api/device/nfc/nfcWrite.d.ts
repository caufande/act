/**
 * nfc写接口 请求参数定义
 * @apiName device.nfc.nfcWrite
 */
export interface IDeviceNfcNfcWriteParams {
    /** NFC芯片的内容 */
    content: string;
}
/**
 * nfc写接口 返回结果定义
 * @apiName device.nfc.nfcWrite
 */
export interface IDeviceNfcNfcWriteResult {
}
/**
 * nfc写接口
 * 只支持有nfc功能的android手机
 * 支持NDEF的数据交换格式
 * 使用方法：首先调用此jsapi，然后再把芯片放上去，即可写入，jsapi调用一次写一次内容
 * @apiName device.nfc.nfcWrite
 * @supportVersion  ios: 2.11.0 android: 2.11.0
 */
export declare function nfcWrite$(params: IDeviceNfcNfcWriteParams): Promise<IDeviceNfcNfcWriteResult>;
export default nfcWrite$;
