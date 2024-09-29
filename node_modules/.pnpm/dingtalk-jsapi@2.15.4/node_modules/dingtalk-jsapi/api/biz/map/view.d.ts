/**
 * 查看定位 请求参数定义
 * @apiName biz.map.view
 */
export interface IBizMapViewParams {
    /** 需要和longitude组合成合法经纬度，高德坐标 */
    latitude: number;
    /** 需要和latitude组合成合法经纬度，高德坐标 */
    longitude: number;
    /** 在地图锚点气泡显示的文案 */
    title: string;
}
/**
 * 查看定位 返回结果定义
 * @apiName biz.map.view
 */
export interface IBizMapViewResult {
}
/**
 * 查看定位
 * @apiName biz.map.view
 * @supportVersion  ios: 2.8.0 android: 2.8.0
 */
export declare function view$(params: IBizMapViewParams): Promise<IBizMapViewResult>;
export default view$;
