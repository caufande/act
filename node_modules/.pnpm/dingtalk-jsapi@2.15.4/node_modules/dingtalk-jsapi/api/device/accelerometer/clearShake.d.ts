/**
 * 停止摇一摇 请求参数定义
 * @apiName device.accelerometer.clearShake
 */
export interface IDeviceAccelerometerClearShakeParams {
}
/**
 * 停止摇一摇 返回结果定义
 * @apiName device.accelerometer.clearShake
 */
export interface IDeviceAccelerometerClearShakeResult {
}
/**
 * 停止摇一摇 清除监听
 * @apiName device.accelerometer.clearShake
 * @supportVersion  ios: 2.4.0 android: 2.4.0
 */
export declare function clearShake$(params: IDeviceAccelerometerClearShakeParams): Promise<IDeviceAccelerometerClearShakeResult>;
export default clearShake$;
