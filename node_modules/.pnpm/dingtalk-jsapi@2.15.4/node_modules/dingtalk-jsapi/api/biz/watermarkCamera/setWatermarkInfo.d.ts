/**
 * 水印相机设置水印信息 请求参数定义
 * @apiName biz.watermarkCamera.setWatermarkInfo
 */
export interface IBizWatermarkCameraSetWatermarkInfoParams {
    /** 位置信息 */
    position?: {
        lat: number;
        lng: number;
        place: string;
        detailPlace: string;
        country: string;
        province: string;
        city: string;
        district: string;
        street: string;
    };
    /** 地址设置页传过来的地址失效时间 */
    positionTimeout?: number;
    /** 水印卡片模版ID */
    templateId: string;
    /** 水印卡片 AppID */
    appId: string;
    /** 水印卡片组件ID */
    widgetName: string;
    /** 水印卡片宽度，支持绝对值（如 200，单位pt）和百分比（如 percent80） */
    width: string;
    /** 水印卡片扩展数据（客户端会缓存） */
    extendData: any;
    /** 水印卡片扩展数据（客户端不缓存） */
    extendDataNoCache?: any;
    /** 水印模版表单Code */
    formCode: string;
    /** 水印模版表单数据 */
    formDataLists?: {
        [key: string]: any;
    }[];
    /** 水印卡片服务端透传信息 */
    extraInfo?: {
        [key: string]: any;
    };
    /** 水印卡片编辑页自定义链接 */
    editUrl?: string;
    /** 水印模版场景码 */
    sceneCode?: string;
    [key: string]: any;
}
/**
 * 水印相机设置水印信息 返回结果定义
 * @apiName biz.watermarkCamera.setWatermarkInfo
 */
export interface IBizWatermarkCameraSetWatermarkInfoResult {
}
/**
 * 水印相机设置水印信息
 * @apiName biz.watermarkCamera.setWatermarkInfo
 * @supportVersion ios: 6.5.25 android: 6.5.25
 * @author Android：朴文 iOS：新鹏
 */
export declare function setWatermarkInfo$(params: IBizWatermarkCameraSetWatermarkInfoParams): Promise<IBizWatermarkCameraSetWatermarkInfoResult>;
export default setWatermarkInfo$;
