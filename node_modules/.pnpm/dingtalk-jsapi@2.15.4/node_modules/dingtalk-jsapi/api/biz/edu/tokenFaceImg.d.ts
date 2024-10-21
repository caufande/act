/**
 * 获取支付宝人脸头像 请求参数定义
 * @apiName biz.edu.tokenFaceImg
 */
export interface IBizEduTokenFaceImgParams {
    /** 支付宝人脸检测的id */
    zimId: string;
    /** 人脸图片解密密钥 */
    token: string;
    /** 用户自定义字段 */
    extInfo?: {
        [key: string]: any;
    };
}
/**
 * 获取支付宝人脸头像 返回结果定义
 * @apiName biz.edu.tokenFaceImg
 */
export interface IBizEduTokenFaceImgResult {
    /** 返回是否成功 */
    success: boolean;
    /** 头像图片的base64编码 */
    faceImage: string;
    /** 返回的编码信息 */
    resultCode: number;
    /** 额外的信息 */
    extInfos?: {
        [key: string]: any;
    };
}
/**
 * 获取支付宝人脸头像
 * @apiName biz.edu.tokenFaceImg
 * @supportVersion ios: 6.3.20 android: 6.3.20
 * Android：绝色 iOS：景松
 */
export declare function tokenFaceImg$(params: IBizEduTokenFaceImgParams): Promise<IBizEduTokenFaceImgResult>;
export default tokenFaceImg$;
