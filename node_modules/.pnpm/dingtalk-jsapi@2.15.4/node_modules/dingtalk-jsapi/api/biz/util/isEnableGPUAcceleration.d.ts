/**
 * 获取当前GPU加速设置是否开启 请求参数定义
 * @apiName biz.util.isEnableGPUAcceleration
 */
export interface IBizUtilIsEnableGPUAccelerationParams {
}
/**
 * 获取当前GPU加速设置是否开启 返回结果定义
 * @apiName biz.util.isEnableGPUAcceleration
 */
export interface IBizUtilIsEnableGPUAccelerationResult {
    /** 当前GPU是否开启 */
    current_enabled: boolean;
    /** 下次启动是否开启GPU */
    next_start_enabled: boolean;
}
/**
 * 获取当前GPU加速设置是否开启
 * @apiName biz.util.isEnableGPUAcceleration
 * @supportVersion Windows：6.0.22
 * @author Windows： 心存
 */
export declare function isEnableGPUAcceleration$(params: IBizUtilIsEnableGPUAccelerationParams): Promise<IBizUtilIsEnableGPUAccelerationResult>;
export default isEnableGPUAcceleration$;
