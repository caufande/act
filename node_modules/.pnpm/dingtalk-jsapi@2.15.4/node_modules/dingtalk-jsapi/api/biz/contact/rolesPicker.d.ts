/**
 * 角色选择组件 请求参数定义
 * @apiName biz.contact.rolesPicker
 */
export interface IBizContactRolesPickerParams {
    /** 企业的corpId； */
    corpId: string;
    /** 最多可选择多少个；若入参超过5000，会按5000来处理；默认1000 */
    maxRoles?: number;
    /** 用户选择的角色数，超过maxRoles个时的提示文案；默认：选择角色数量超出限制 */
    limitTips?: string;
    /** 组件的页面title；默认：选择角色 */
    title?: string;
}
/**
 * 角色选择组件 返回结果定义
 * @apiName biz.contact.rolesPicker
 */
export interface IBizContactRolesPickerResult {
    /** {name:角色名,roleId:角色id}列表 */
    roles: {
        name: string;
        roleId: string;
        [key: string]: any;
    }[];
}
/**
 * 角色选择组件
 * @apiName biz.contact.rolesPicker
 * @supportVersion ios: 6.3.16 android: 6.3.16
 * @author android 启宏 iOS 姚曦
 */
export declare function rolesPicker$(params: IBizContactRolesPickerParams): Promise<IBizContactRolesPickerResult>;
export default rolesPicker$;
