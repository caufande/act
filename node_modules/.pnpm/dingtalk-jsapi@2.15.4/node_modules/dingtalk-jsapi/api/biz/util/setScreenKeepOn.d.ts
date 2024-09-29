/**
 * 设置屏幕常亮 请求参数定义
 * @apiName biz.util.setScreenKeepOn
 */
export interface IBizUtilSetScreenKeepOnParams {
    /** 是否保持常亮 默认false */
    isKeep: boolean;
}
/**
 * 设置屏幕常亮 返回结果定义
 * @apiName biz.util.setScreenKeepOn
 */
export interface IBizUtilSetScreenKeepOnResult {
}
/**
 * 设置屏幕常亮，防止熄屏 H5容器关闭后自动失效
 * @apiName biz.util.setScreenKeepOn
 * @supportVersion ios: 5.1.26 android: 5.1.26
 * @author Android：峰砺 iOS：新鹏
 */
export declare function setScreenKeepOn$(params: IBizUtilSetScreenKeepOnParams): Promise<IBizUtilSetScreenKeepOnResult>;
export default setScreenKeepOn$;
