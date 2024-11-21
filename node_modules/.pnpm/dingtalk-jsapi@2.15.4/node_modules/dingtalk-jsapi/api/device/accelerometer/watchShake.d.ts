/**
 * 启动摇一摇 请求参数定义
 * @apiName device.accelerometer.watchShake
 */
export interface IDeviceAccelerometerWatchShakeParams {
    /** 振动幅度，Number类型，加速度变化超过这个值后触发shake */
    sensitivity: number;
    /** 采样间隔(毫秒)，Number类型，指每隔多长时间对加速度进行一次采样， 然后对比前后变化，判断是否触发shake */
    frequency: number;
    /** 触发『摇一摇』后的等待时间(毫秒)，Number类型，防止频繁调用 */
    callbackDelay: number;
    /** onSuccess为监听函数 */
    onSuccess?: () => void;
}
/**
 * 启动摇一摇 返回结果定义
 * @apiName device.accelerometer.watchShake
 */
export interface IDeviceAccelerometerWatchShakeResult {
}
/**
 * 启动摇一摇
 * 开启监听
 * @apiName device.accelerometer.watchShake
 * @supportVersion  ios: 2.4.0 android: 2.4.0
 */
export declare function watchShake$(params: IDeviceAccelerometerWatchShakeParams): Promise<IDeviceAccelerometerWatchShakeResult>;
export default watchShake$;
