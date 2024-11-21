/**
 * 选人与部门 请求参数定义
 * @apiName biz.contact.complexPicker
 */
export interface IBizContactComplexPickerParams {
    /** 标题 */
    title?: string;
    /** 企业的corpId  */
    corpId?: string;
    /** 是否多选 */
    multiple?: boolean;
    /** 超过限定人数返回提示 */
    limitTips?: string;
    /** 选人组件，用户未选择人的时候，左下角的提示文案 */
    pickTips?: string;
    /** 最大可选人数 */
    maxUsers?: number;
    /** 已选用户 */
    pickedUsers?: string[];
    /** 已选部门 */
    pickedDepartments?: string[];
    /** 不可选用户 */
    disabledUsers?: string[];
    /** 不可选部门 */
    disabledDepartments?: string[];
    /** 必选用户（不可取消选中状态） */
    requiredUsers?: string[];
    /** 必选部门（不可取消选中状态） */
    requiredDepartments?: string[];
    /** 微应用的Id */
    appId?: number;
    /** 选人权限，目前只有GLOBAL这个参数 */
    permissionType?: string;
    /** 返回人，或者返回人和部门 */
    responseUserOnly?: boolean;
    /** 0表示从企业最上层开始 */
    startWithDepartmentId?: number;
    /** 上游业务来源 */
    origin?: number;
    /** 上游业务来源描述 */
    originMeta?: string;
    /** 只支持移动端，可以直接跳到具体部门。-1 表示根部门，0 表示当前部门（startWithDepartmentId需要传2，depId才生效） */
    deptId?: number;
}
/**
 * 选人与部门 返回结果定义
 * @apiName biz.contact.complexPicker
 */
export interface IBizContactComplexPickerResult {
    /** 选择人数 */
    selectedCount: number;
    /** 返回选人的列表，列表中的对象包含name（用户名），avatar（用户头像），emplId（用户工号）三个字段 */
    users?: Array<{
        name: string;
        avatar: string;
        /** 用户工号 */
        emplId: string;
        /** 员工部门 id */
        selectDeptId?: number;
        /** 员工部门名称 */
        selectDeptName?: string;
    }>;
    /** 返回已选部门列表，列表中每个对象包含id（部门id）、name（部门名称）、number（部门人数） */
    departments?: Array<{
        id: string;
        name: string;
        number: string;
    }>;
}
/**
 * 选人与部门
 * 支持选择部门后，把所选部门转换成对应部门下的人，permissionType可以添加权限校验
 * @apiName biz.contact.complexPicker
 * @supportVersion  ios: 2.9.0 android: 2.9.0 pc: 4.3.5
 * @author iOS：晓毒; Android：几米;
 */
export declare function complexPicker$(params: IBizContactComplexPickerParams): Promise<IBizContactComplexPickerResult>;
export default complexPicker$;
