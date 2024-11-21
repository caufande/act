/**
 * 发钉 请求参数定义
 * @apiName biz.ding.post
 */
export interface IBizDingPostParams {
    /** 用户列表，工号 */
    users: string[];
    /** 企业id */
    corpId: string;
    /** 附件类型 1：image  2：link */
    type: 1 | 2;
    /** 钉发送方式 0:电话, 1:短信, 2:应用内 */
    alertType?: 0 | 1 | 2;
    alertDate?: {
        /** yyyy-MM-dd HH:mm */
        format: string;
        /** 2015-05-09 08:00 */
        value: string;
    };
    /** 附件信息 */
    attachment?: {
        images: string[];
    } | {
        title: string;
        url: string;
        image: string;
        text: string;
    };
    /** 正文 */
    text?: string;
}
/**
 * 发钉 返回结果定义
 * @apiName biz.ding.post
 */
export interface IBizDingPostResult {
}
/**
 * 发钉
 * @apiName biz.ding.post
 * @supportVersion  pc: 3.0.0 ios: 2.4.0 android: 2.4.0
 */
export declare function post$(params: IBizDingPostParams): Promise<IBizDingPostResult>;
export default post$;
