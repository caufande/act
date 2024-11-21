/**
 * 地图定位 请求参数定义
 * @apiName biz.map.locate
 */
export interface IBizMapLocateParams {
    /** 非必须字段，需要和longitude组合成合法经纬度，高德坐标 */
    latitude?: number;
    /** 非必须字段，需要和latitude组合成合法经纬度，高德坐标 */
    longitude?: number;
}
/**
 * 地图定位 返回结果定义
 * @apiName biz.map.locate
 */
export interface IBizMapLocateResult {
    /** POI所在省会，可能为空 */
    province: string;
    /** POI所在省会编码，可能为空 */
    provinceCode: string;
    /** POI所在城市，可能为空 */
    city: string;
    /** POI所在城市的编码，可能为空 */
    cityCode: string;
    /** POI所在区，可能为空 */
    adName: string;
    /** POI所在区的编码，可能为空 */
    adCode: string;
    /** POI与设备位置的距离 */
    distance: string;
    /** POI的邮编，可能为空 */
    postCode: string;
    /** POI的街道地址，可能为空 */
    snippet: string;
    /** POI的名称 */
    title: string;
    /** POI的纬度，高德坐标 */
    latitude: number;
    /** POI的经度，高德坐标 */
    longitude: number;
}
/**
 * 地图定位
 * 唤起地图页面，获取设备位置及设备附近的POI信息；若传入的合法经纬度则显示出入的位置信息及其附近的POI信息。
 * @apiName biz.map.locate
 * @supportVersion  ios: 2.4.0 android: 2.4.0
 */
export declare function locate$(params: IBizMapLocateParams): Promise<IBizMapLocateResult>;
export default locate$;
