/**
 * 开启持续定位 请求参数定义
 * @apiName device.geolocation.start
 */
export interface IDeviceGeolocationStartParams {
    /** 期望定位精度半径（单位米），定位结果尽量满足该参数要求，
     * 但是不一定能保证小于该误差，开发者需要读取返回结果的 accuracy 字段校验坐标精度；
     * 建议按照业务需求设置定位精度，推荐采用200m，可获得较好的精度和较短的响应时长
     */
    targetAccuracy: number;
    /** iOS端位置变更敏感度，单位为m，此值会影响iOS端callback回调速率 */
    iOSDistanceFilter: number;
    /** 是否缓存地理位置信息。默认是true。如果true，客户端会对定位的地理位置信息缓存，在缓存期内（2分钟）再次定位会返回旧的定位 */
    useCache?: boolean;
    /** 是否需要带有逆地理编码信息；该功能需要网络请求，请更具自己的业务场景使用,默认否 */
    withReGeocode?: boolean;
    /** 数据回传最小时间间隔，单位ms */
    callBackInterval: number;
    /** 定位场景id，对于同一id的，不可连续start，否则会报错。不同scenceId的互不影响 */
    sceneId: string;
}
/**
 * 开启持续定位 返回结果定义
 * @apiName device.geolocation.start
 */
export interface IDeviceGeolocationStartResult {
    /** 经度 */
    longitude: number;
    /** 纬度 */
    latitude: number;
    /** 实际的定位精度半径（单位米） */
    accuracy: number;
    /** 格式化地址，如：北京市朝阳区南磨房镇北京国家广告产业园区 */
    address: string;
    /** 省份，如：北京市 */
    province: string;
    /** 城市，直辖市会返回空 */
    city: string;
    /** 行政区，如：朝阳区 */
    district: string;
    /** 街道，如：西大望路甲12-2号楼 */
    road: string;
    /** 当前设备网络类型，如：wifi、3g等 */
    netType: string;
    /** 当前设备使用移动运营商，如：CMCC等 */
    operatorType: string;
    /** 对错误码的描述 */
    errorMessage?: string;
    /** 错误码 */
    errorCode?: number;
    /** 仅Android支持，wifi设置是否开启，不保证已连接上 */
    isWifiEnabled?: boolean;
    /** 仅Android支持，gps设置是否开启，不保证已经连接上 */
    isGpsEnabled?: boolean;
    /** 仅Android支持，定位返回的经纬度是否是模拟的结果 */
    isFromMock?: boolean;
    /** 仅Android支持，我们使用的是混合定位，具体定位提供者有wifi/lbs/gps" 这三种 */
    provider?: 'wifi' | 'lbs' | 'gps';
    /** 仅Android支持，移动网络是设置是否开启，不保证已经连接上 */
    isMobileEnabled: boolean;
}
/**
 * 连续获取当前地理位置信息(持续定位)
 * 连续定位接口可以通过持续接收callback的方式，不断获取到用户当前的位置信息。
 * 相比单次定位JSAPI，持续定位可以通过延长定位时间、增加定位次数的方式，不断接收用户位置信息，提高定位精度。可用于对定位精度要求较高以及需要持续更新用户位置的场景。
 * 连续定位功能(需要钉钉v3.4.8及以上版本支持)，由以下三个接口组成，分别表示开始连续定位(start)、停止连续定位(stop)、以及获取当前定位状态(status)。
 * @apiName device.geolocation.start
 * @supportVersion  ios: 3.4.7 android: 3.4.7
 */
export declare function start$(params: IDeviceGeolocationStartParams): Promise<IDeviceGeolocationStartResult>;
export default start$;
