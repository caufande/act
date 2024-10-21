/**
 * 开始匹配打卡规则，多次回调如未成功回调，表示此时没有正常扫描到对应的资源，此时调用打卡接口不能得到对应的资源信息拒绝同一微应用、同一企业、同一bizInstId的连续多次调用，调用前需stop上一次操作 请求参数定义
 * @apiName biz.pbp.startMatchRuleFromPartner
 */
export interface IBizPbpStartMatchRuleFromPartnerParams {
    /** 业务实例唯一标识 */
    bizInstId: string;
    /** 需要满足的位置信息，与打卡方式映射。满足其中条件即视为。 key:positionType，定义如下
     * "1":地理位置
     * "2":Wi-Fi
     * "101":蓝牙
     * value:positionList，可传空，空的情况下不做匹配，返回扫描到的资源信息，定义如下:
     * 位置id
     * String positionId
     * 目前仅支持蓝牙
     * 蓝牙打卡方式下，key为"101"，value为蓝牙匹配规则的JSON结构体，
     * 如
     * {
     *  "101":{"positions": [{"positionId":"123123"}, {"positionId":"123123123"}]}
     * }
     **/
    positionMap: {
        [key: string]: any;
    };
}
/**
 * 开始匹配打卡规则，多次回调如未成功回调，表示此时没有正常扫描到对应的资源，此时调用打卡接口不能得到对应的资源信息拒绝同一微应用、同一企业、同一bizInstId的连续多次调用，调用前需stop上一次操作 返回结果定义
 * @apiName biz.pbp.startMatchRuleFromPartner
 */
export interface IBizPbpStartMatchRuleFromPartnerResult {
    /**
     * 匹配结果状态码，定义如下：
     * "10000":卡点匹配成功
     * "10001":卡点未匹配
     * "10002":卡点匹配停止
     **/
    code: string;
    /**
     * 返回匹配数据，定义如下：
     * 每次调用开始匹配接口为调用方生成唯一的ID，打卡用
     * 1: string positionSessionId
     * // 位置类型,"101" 为蓝牙
     * 2: string positionType
     * // 当前返回的位置信息，"positionName"为位置名称，"positionId"为位置ID
     * 3: list<Object> positions
     * // 预留字段
     * 4: map<string, string> extension
     * 目前仅支持蓝牙。蓝牙返回的结果是当前周边所有匹配到的蓝牙设备列表信息
     * 如
     * {
     *  "positionSessionId":"positionSessionId",
     *  "positionType":"101",
     *  "positions":[{
     *    "positionName":"测试B1",
     *    "positionId":"123123"
     *   }]
     * }
     */
    data: any;
}
/**
 * 开始匹配打卡规则，多次回调如未成功回调，表示此时没有正常扫描到对应的资源，此时调用打卡接口不能得到对应的资源信息拒绝同一微应用、同一企业、同一bizInstId的连续多次调用，调用前需stop上一次操作
 * @apiName biz.pbp.startMatchRuleFromPartner
 * @supportVersion ios: 5.1.10 android: 5.1.10
 * @author Android：序望，iOS：度尽
 */
export declare function startMatchRuleFromPartner$(params: IBizPbpStartMatchRuleFromPartnerParams): Promise<IBizPbpStartMatchRuleFromPartnerResult>;
export default startMatchRuleFromPartner$;
