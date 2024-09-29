/**
 * 获取H5容器启动时间 请求参数定义
 * @apiName runtime.monitor.getLoadTime
 */
export interface IRuntimeMonitorGetLoadTimeParams {
    /**
     * RuntimeLaunchTime：容器启动耗时
     * PageLoadTime：容器启动时间，从init到第一个页面加载成功
     * RuntimeStartLoadTime：容器初始化到容器中的 webview 开始加载 web 资源的耗时
    */
    type: string;
}
/**
 * 获取H5容器启动时间 返回结果定义
 * @apiName runtime.monitor.getLoadTime
 */
export interface IRuntimeMonitorGetLoadTimeResult {
    /** 所查询对应的时间 */
    time: number;
    /** 同入参 */
    type: string;
}
/**
 * 获取H5容器启动时间
 * @apiName runtime.monitor.getLoadTime
 * @supportVersion ios: 6.0.10 android: 6.0.10
 * @author Android：泠轩 iOS：序元
 */
export declare function getLoadTime$(params: IRuntimeMonitorGetLoadTimeParams): Promise<IRuntimeMonitorGetLoadTimeResult>;
export default getLoadTime$;
