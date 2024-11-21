/**
 * 返回小程序此次打开的关键性能数据 请求参数定义
 * @apiName biz.util.getPerfInfo
 */
export interface IBizUtilGetPerfInfoParams {
}
/**
 * 返回小程序此次打开的关键性能数据 返回结果定义
 * @apiName biz.util.getPerfInfo
 */
export interface IBizUtilGetPerfInfoResult {
    /** 小程序打开的时间戳(单位是秒，1970开始) */
    prepareStartTime: number;
    /** appLoad开销 */
    appLoadedCost: number;
    /** pageLoad开销 */
    pageLoadedCost: number;
    /** renderFramework加载开销 */
    renderFrameworkLoadCost: number;
    /** workerFramework加载开销 */
    workerFrameworkLoadCost: number;
    /** 包准备开销 */
    prepareAppCost: number;
    /** 是否需要下载zip包 */
    prepareNeedDownload: boolean;
    /** 包元数据请求开销 */
    prepareReqInfoCost: number;
    /** Zip包下载开销 */
    prepareDownloadCost: number;
    /** Zip包解压开销 */
    prepareUnZipCost: number;
    /** 包Version */
    metaPackageVersion: string;
    /** 包Nick */
    metaPackageNick: string;
    /** Appx包Nick */
    metaAppxPackageNick: string;
    /** bizReadyTime-prepareStartTime的时长 */
    bizReadyCost: number;
}
/**
 * 返回小程序此次打开的关键性能数据
 * @apiName biz.util.getPerfInfo
 * @supportVersion ios: 5.1.14 android: 5.1.14
 * @author Android: 攸元 iOS: 贾逵
 */
export declare function getPerfInfo$(params: IBizUtilGetPerfInfoParams): Promise<IBizUtilGetPerfInfoResult>;
export default getPerfInfo$;
