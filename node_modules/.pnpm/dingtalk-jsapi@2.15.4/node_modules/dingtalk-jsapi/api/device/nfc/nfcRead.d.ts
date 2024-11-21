/**
 * nfc读取接口 请求参数定义
 * @apiName device.nfc.nfcRead
 */
export interface IDeviceNfcNfcReadParams {
}
/**
 * nfc读取接口 返回结果定义
 * @apiName device.nfc.nfcRead
 */
export interface IDeviceNfcNfcReadResult {
    /** NFC芯片的内容 */
    content: string;
}
/**
 * nfc读取接口
 * 只支持有nfc功能的android手机
 * 支持NDEF的数据交换格式
 * 使用方法：首先调用此jsapi，然后再把芯片放上去，即可读取，jspai调用一次读取一次信息
 * @apiName device.nfc.nfcRead
 * @supportVersion  ios: 2.11.0 android: 2.11.0
 */
export declare function nfcRead$(params: IDeviceNfcNfcReadParams): Promise<IDeviceNfcNfcReadResult>;
export default nfcRead$;
