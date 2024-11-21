/**
 * 获取经纬度 请求参数定义
 * @apiName device.geolocation.get
 */
export interface IDeviceGeolocationGetParams {
    /**
     * 期望定位精度半径（单位米），定位结果尽量满足该参数要求，但是不一定能保证小于该误差，
     * 开发者需要读取返回结果的 accuracy 字段校验坐标精度；
     * 建议按照业务需求设置定位精度，推荐采用200m，
     * 可获得较好的精度和较短的响应时长
     */
    targetAccuracy: number;
    /** 1：获取高德坐标， 0：获取标准坐标；推荐使用高德坐标；标准坐标没有address字段 */
    coordinate: number;
    /** 是否需要带有逆地理编码信息；该功能需要网络请求，请更具自己的业务场景使用 */
    withReGeocode: boolean;
    /** 是否缓存地理位置信息。默认是true。如果true，客户端会对定位的地理位置信息缓存，在缓存期内（2分钟）再次定位会返回旧的定位 */
    useCache: boolean;
}
/**
 * 获取经纬度 返回结果定义
 * @apiName device.geolocation.get
 */
export interface IDeviceGeolocationGetResult {
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
 * 获取当前地理位置(单次定位)
 * Android客户端返回坐标是高德坐标，iOS客户端2.7.6及以后版本支持返回高德坐标；IOS客户端低于2.7.6版本仅支持返回标准坐标，如需使用高德坐标，可对返回的坐标做转换，具体请参考转换方法和坐标转换APIDemo演示页面
 * 钉钉Android客户端2.1及之前版本返回的数据结构比iOS客户端多嵌套一层location字段，2.2及之后版本返回的数据结构与钉钉iOS客户端一致，建议对返回的数据先判断存在location，做向后兼容处理。
 * @apiName device.geolocation.get
 * @supportVersion  ios: 2.4.0 android: 2.4.0
 */
export declare function get$(params: IDeviceGeolocationGetParams): Promise<IDeviceGeolocationGetResult>;
export default get$;
