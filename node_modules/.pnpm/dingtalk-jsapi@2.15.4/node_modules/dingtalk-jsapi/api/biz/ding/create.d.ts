/**
 * 打开DING、任务、会议界面 请求参数定义
 * @apiName biz.ding.create
 */
export interface IBizDingCreateParams {
    /** 用户列表，工号 */
    users: string[];
    /** 企业id */
    corpId: string;
    /** 附件类型 1：image  2：link */
    type?: 1 | 2;
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
    /** 业务类型 0：通知DING；1：任务；2：会议； */
    bizType?: 0 | 1 | 2;
    /** 会议信息 */
    confInfo?: {
        /** 子业务类型如会议：0：预约会议；1：预约电话会议；2：预约视频会议；（注：目前只有会议才有子业务类型） */
        bizSubType: 0 | 1 | 2;
        /** 会议地点；（非必填） */
        location?: string;
        /**  会议开始时间 */
        startTime?: {
            /** yyyy-MM-dd HH:mm */
            format: string;
            /** 2015-05-09 08:00 */
            value: string;
        };
        /**  会议结束时间 */
        endTime?: {
            /** yyyy-MM-dd HH:mm */
            format: string;
            /** 2015-05-09 08:00 */
            value: string;
        };
        /** 会前提醒。单位分钟-1：不提醒；0：事件发生时提醒；5：提前5分钟；15：提前15分钟；30：提前30分钟；60：提前1个小时；1440：提前一天； */
        remindMinutes?: number;
        /** 会议提前提醒方式。0:电话, 1:短信, 2:应用内 */
        remindType?: 0 | 1 | 2;
    };
    taskInfo?: {
        /** 抄送用户列表，工号 */
        ccUsers?: string[];
        /** 任务截止时间 */
        deadlineTime?: {
            /** yyyy-MM-dd HH:mm */
            format: string;
            /** 2015-05-09 08:00 */
            value: string;
        };
        /** 任务提醒时间，单位分钟0：不提醒；15：提前15分钟；60：提前1个小时；180：提前3个小时；1440：提前一天； */
        taskRemind?: number;
    };
}
/**
 * 打开DING、任务、会议界面 返回结果定义
 * @apiName biz.ding.create
 */
export interface IBizDingCreateResult {
    dingCreateResult?: boolean;
}
/**
 * 打开DING、任务、会议界面
 * @description 钉钉3.5.1版本以后建议使用Ding 2.0发钉接口，Ding 1.0 发钉接口(dd.biz.ding.post)会被慢慢废弃。请大家及时切换，并关注兼容性问题。
 * DING 2.0发钉接口支持打开DING、任务、会议界面。
 * 目前发钉只支持客户端发钉，不支持直接通过服务端发钉。
 * @apiName biz.ding.create
 * @supportVersion  ios: 3.5.1 android: 3.5.1
 */
export declare function create$(params: IBizDingCreateParams): Promise<IBizDingCreateResult>;
export default create$;
