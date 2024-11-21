/**
 * 水印相机读取水印信息 请求参数定义
 * @apiName biz.watermarkCamera.getWatermarkInfo
 */
export interface IBizWatermarkCameraGetWatermarkInfoParams {
}
/**
 * 水印相机读取水印信息 返回结果定义
 * @apiName biz.watermarkCamera.getWatermarkInfo
 */
export interface IBizWatermarkCameraGetWatermarkInfoResult {
    /** 位置信息 */
    position: {
        [key: string]: any;
    };
    /** 日期时间 */
    datetime: {
        [key: string]: any;
    };
    /** 模版ID */
    templateId: string;
    /** AppID */
    appId: string;
    /** 组件ID */
    widgetName: string;
    /** 宽度 */
    width: string;
    /** 扩展数据 */
    extendData: any;
    /** 卡片透传数据 */
    extraInfo: {
        [key: string]: any;
    };
    /** 编辑链接 */
    editUrl: string;
    /** 场景码 */
    sceneCode: string;
}
/**
 * 水印相机读取水印信息
 * @apiName biz.watermarkCamera.getWatermarkInfo
 * @supportVersion ios: 6.5.25 android: 6.5.25
 * @author Android：朴文 iOS：新鹏
 */
export declare function getWatermarkInfo$(params: IBizWatermarkCameraGetWatermarkInfoParams): Promise<IBizWatermarkCameraGetWatermarkInfoResult>;
export default getWatermarkInfo$;
