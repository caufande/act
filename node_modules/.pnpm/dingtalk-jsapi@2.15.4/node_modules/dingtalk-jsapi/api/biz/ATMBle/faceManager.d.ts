/**
 * 人脸识别管理组件，主要支持唤起组件对人脸开关设置，以及对录入的人脸进行管理 请求参数定义
 * @apiName biz.ATMBle.faceManager
 */
export interface IBizATMBleFaceManagerParams {
    /** 企业ID，服务端会对权限做控制 */
    corpId: string;
    /** 人脸管理,用户ID列表，List<Long>，json格式 */
    userIds?: string;
    /** 人脸管理,排除的用户ID列表，List<Long>，json格式 */
    excludeUserIds?: string;
    /** 人脸管理,部门ID列表，List<Long>，json格式 */
    deptIds?: string;
    /** 人脸管理,排除的部门ID列表，List<Long>，json格式 */
    excludeDeptIds?: string;
    /** 人脸开关 */
    switchValue?: boolean;
    /** 扩展字段，先预留 */
    extData?: string;
}
/**
 * 人脸识别管理组件，主要支持唤起组件对人脸开关设置，以及对录入的人脸进行管理 返回结果定义
 * @apiName biz.ATMBle.faceManager
 */
export interface IBizATMBleFaceManagerResult {
    switchValue: boolean;
}
/**
 * 人脸识别管理组件，主要支持唤起组件对人脸开关设置，以及对录入的人脸进行管理
 * @apiName biz.ATMBle.faceManager
 * @supportVersion ios: 5.0.7 android: 5.0.7
 * @author Android:序望，iOS：度尽
 */
export declare function faceManager$(params: IBizATMBleFaceManagerParams): Promise<IBizATMBleFaceManagerResult>;
export default faceManager$;
