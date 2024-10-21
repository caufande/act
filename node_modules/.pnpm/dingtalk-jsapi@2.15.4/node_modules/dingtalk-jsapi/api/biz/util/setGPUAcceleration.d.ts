/**
 * 设置GPU加速状态 请求参数定义
 * @apiName biz.util.setGPUAcceleration
 */
export interface IBizUtilSetGPUAccelerationParams {
    /** 设置下次启动时候是否启用GPU加速 */
    next_start_enable: boolean;
}
/**
 * 设置GPU加速状态 返回结果定义
 * @apiName biz.util.setGPUAcceleration
 */
export interface IBizUtilSetGPUAccelerationResult {
    /** 调用设置是否成功 */
    result: boolean;
}
/**
 * 设置GPU加速状态
 * @apiName biz.util.setGPUAcceleration
 * @supportVersion Windows：6.0.22
 * @author Windows： 心存
 */
export declare function setGPUAcceleration$(params: IBizUtilSetGPUAccelerationParams): Promise<IBizUtilSetGPUAccelerationResult>;
export default setGPUAcceleration$;
