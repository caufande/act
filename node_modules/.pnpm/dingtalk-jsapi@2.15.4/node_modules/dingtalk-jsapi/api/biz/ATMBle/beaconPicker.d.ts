/**
 * B1设备选择器，对外开放接口 请求参数定义
 * @apiName biz.ATMBle.beaconPicker
 */
export interface IBizATMBleBeaconPickerParams {
    /** 企业ID，服务端会对权限做控制 */
    corpId: string;
    /** 使用场景，通过调取平台服务获取 */
    bizCode: string;
    /** 默认勾选B1设备ID列表，List<Long>，json格式 */
    pickedBeacons?: string;
    /** 不可选设备ID列表，List<Long>，json格式 */
    disabledBeacons?: string;
    /** 必选设备ID列表，List<Long>，json格式 */
    requireBeacons?: string;
    /** 人脸管理,用户ID列表，List<Long>，json格式 */
    userIds?: string;
    /** 人脸管理,排除的用户ID列表，List<Long>，json格式 */
    excludeUserIds?: string;
    /** 人脸管理,部门ID列表，List<Long>，json格式 */
    deptIds?: string;
    /** 人脸管理,排除的部门ID列表，List<Long>，json格式 */
    excludeDeptIds?: string;
    /** 是否支持多选 */
    multiple?: boolean;
    /** 最大可选数量 */
    max?: number;
    /** 超过限定数量提示 */
    limitTips?: string;
    /** 页面标题 */
    title?: string;
    /** 上游业务来源 */
    origin?: string;
    /** 是否支持实人 */
    supportFace?: boolean;
    /** 是否支持距离 */
    supportDistance?: boolean;
    /** 设置的蓝牙设备距离 */
    distance?: string;
    /** 人脸开关 */
    useFaceRecognition?: boolean;
    /** 扩展字段，先预留 */
    extData?: string;
}
/**
 * B1设备选择器，对外开放接口 返回结果定义
 * @apiName biz.ATMBle.beaconPicker
 */
export interface IBizATMBleBeaconPickerResult {
    /** 选择的设备ID列表 */
    chosenBeacons: number[];
    /** 人脸识别开关 */
    useFaceRecognition: boolean;
    /** 设置的蓝牙设备距离 */
    distance: number;
}
/**
 * B1设备选择器，对外开放接口
 * @apiName biz.ATMBle.beaconPicker
 * @supportVersion ios: 5.0.7 android: 5.0.7
 * @author Android:序望，iOS：度尽
 */
export declare function beaconPicker$(params: IBizATMBleBeaconPickerParams): Promise<IBizATMBleBeaconPickerResult>;
export default beaconPicker$;
