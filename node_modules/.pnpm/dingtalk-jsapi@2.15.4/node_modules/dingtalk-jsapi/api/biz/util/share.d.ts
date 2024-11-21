/**
 * 分享 请求参数定义
 * @apiName biz.util.share
 */
export interface IBizUtilShareParams {
    /** 分享类型，0:全部组件默认； 1:只能分享到钉钉；2:不能分享，只有刷新按钮 */
    type: number;
    /** url地址 */
    url: string;
    /** 分享标题 */
    title: string;
    /** 分享内容 */
    content: string;
    /** 分享的图片 */
    image: string;
    /** 每个平台自定义的内容 */
    custom?: {
        [key: string]: {
            content: string;
            image: string;
            url: string;
            title: string;
        };
    };
    /** 数组代表需要使用那几个平台，并且按序显示 */
    order?: string[];
    /** 按钮名 */
    buttonName?: string;
    /** 是否只显示分享平台，布尔值，true:只显示分享平台，false:不仅显示分享平台，也显示收藏，复制等操作选项 */
    onlyShare?: boolean;
    /** 不用选择平台，直接跳到指定平台分享，值与下表key值相同 */
    destChannelStyle?: string;
    /** 用于传递手机号，进行短信的分享 */
    smsRecipients?: string[];
    /** 提供前端支持额外增加分享item的展示，item点击后返回对应的key提供前端进行业务处理 >5.1.1以上支持 移动端 */
    custom_addon?: {
        [customShareType: string]: {
            title: string;
            iconUrl: string;
        };
    };
}
/**
 * 分享 返回结果定义
 * @apiName biz.util.share
 */
export interface IBizUtilShareResult {
    /** 分享平台类型 */
    shareType?: string;
    /** result */
    result?: 0 | 1 | 2;
}
/**
 * 分享
 * @apiName biz.util.share
 * @supportVersion  ios: 2.4.0 android: 2.4.0
 * @author android:长岚 iOS: 文算
 */
export declare function share$(params: IBizUtilShareParams): Promise<IBizUtilShareResult>;
export default share$;
