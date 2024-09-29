/**
 * 实人实地开放，半屏弹窗 请求参数定义
 * @apiName biz.ATMBle.detectFace
 */
export interface IBizATMBleDetectFaceParams {
    /** 企业 ID */
    corpId: string;
    /** 企业用户 ID */
    userId: string;
    /** 当前是否已录入人脸 */
    hasFace: boolean;
    /** 是否需要美颜，部分机型由于兼容性问题不支持 */
    needBeauty?: boolean;
    /** 是否需要活体检测，未录入人脸时不支持 */
    needFacePose?: boolean;
    /** 半屏弹窗的标题 */
    spaceTitle?: string;
}
/**
 * 实人实地开放，半屏弹窗 返回结果定义
 * @apiName biz.ATMBle.detectFace
 */
export interface IBizATMBleDetectFaceResult {
    /**
     * 人脸识别结果
     * 1:人脸验证/录入成功
     * 2:人脸验证/录入失败
     */
    photoStatus: number;
    /** 生成资源对应的sessionId，可用于组件打卡时携带人脸信息 */
    faceSessionId: string;
}
/**
 * 实人实地开放，半屏弹窗
 * @apiName biz.ATMBle.detectFace
 * @supportVersion ios: 5.1.18 android: 5.1.18
 * @author Android：序望，iOS：度尽
 */
export declare function detectFace$(params: IBizATMBleDetectFaceParams): Promise<IBizATMBleDetectFaceResult>;
export default detectFace$;
