/**
 * 选择打卡方式的通用组件，目前支持选择地理位置、Wi-Fi、智点B1、考勤机 请求参数定义
 * @apiName biz.ATMBle.punchModePicker
 */
export interface IBizATMBlePunchModePickerParams {
    /** 当选择支持智点B1打卡、考勤机打卡时，则必须有corpId */
    corpId?: string;
    /** 需要支持的打卡方式，json序列化后的数据格式： ['location', 'wifi', 'beacon', 'atm']
     * 含义：
     * 'location':地理位置打卡
     * 'wifi':Wi-Fi打卡
     * 'beacon':智点B1打卡
     * 'atm':考勤机打卡
     */
    supportModes: string[];
    /** 禁用的打卡方式，json序列化后的数据格式： ['location', 'wifi', 'beacon', 'atm']
     * 含义：
     * 'location':地理位置打卡
     * 'wifi':Wi-Fi打卡
     * 'beacon':智点B1打卡
     * 'atm':考勤机打卡
     */
    disabledModes: string[];
    /** 用于透传，json序列化后的数据格式： [{type: 'location', enable: true, list: []}] 意义待补充 */
    modes: Array<{
        type: string;
        enable: boolean;
        list: any[];
    }>;
    /** 扩展字段，先预留 */
    extData?: string;
}
/**
 * 选择打卡方式的通用组件，目前支持选择地理位置、Wi-Fi、智点B1、考勤机 返回结果定义
 * @apiName biz.ATMBle.punchModePicker
 */
export interface IBizATMBlePunchModePickerResult {
    /** 选择结果，也是下次调用组件的入参，json序列化后的数据格式： [{type: 'location', enable: true, list: []}] 意义待补充 */
    modes: Array<{
        type: string;
        enable: boolean;
        list: any[];
    }>;
}
/**
 * 选择打卡方式的通用组件，目前支持选择地理位置、Wi-Fi、智点B1、考勤机
 * @apiName biz.ATMBle.punchModePicker
 * @supportVersion ios: 5.0.7 android: 5.0.7
 * @author Android：序望，iOS：度尽
 */
export declare function punchModePicker$(params: IBizATMBlePunchModePickerParams): Promise<IBizATMBlePunchModePickerResult>;
export default punchModePicker$;
