/**
 * 钉钉校园人脸采集 请求参数定义
 * @apiName biz.edu.startAuth
 */
export interface IBizEduStartAuthParams {
    /** 支付宝人脸检测的id */
    zimId: string;
    /** 组织id */
    corpId: string;
    /** staff id */
    staffId: string;
    /** false：不上传人脸认证图片 true：上传人脸认证图片；默认：false */
    uploadFaceData?: boolean;
    /** 用户自定义字段 */
    extInfo: {
        [key: string]: any;
    };
}
/**
 * 钉钉校园人脸采集 返回结果定义
 * @apiName biz.edu.startAuth
 */
export interface IBizEduStartAuthResult {
    /** 人脸录入状态 */
    resultStatus: boolean;
}
/**
 * 钉钉校园人脸采集
 * @apiName biz.edu.startAuth
 * @supportVersion ios: 6.3.20 android: 6.3.20
 * @author Android：绝色 iOS： 景松
 */
export declare function startAuth$(params: IBizEduStartAuthParams): Promise<IBizEduStartAuthResult>;
export default startAuth$;
