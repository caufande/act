/**
 * 选择图片 请求参数定义
 * @apiName biz.intent.fetchData
 */
export interface IBizIntentFetchDataParams {
    [key: string]: any;
}
/**
 * 选择图片 返回结果定义
 * @apiName biz.intent.fetchData
 */
export interface IBizIntentFetchDataResult {
    [key: string]: any;
}
/**
 * 选择图片
 * @apiName biz.intent.fetchData
 * @supportVersion  ios: 2.7.6 android: 2.7.6
 */
export declare function fetchData$(params: IBizIntentFetchDataParams): Promise<IBizIntentFetchDataResult>;
export default fetchData$;
