/**
 * 选部门 请求参数定义
 * @apiName biz.contact.departmentsPicker
 */
export interface IBizContactDepartmentsPickerParams {
    [key: string]: any;
}
/**
 * 选部门 返回结果定义
 * @apiName biz.contact.departmentsPicker
 */
export interface IBizContactDepartmentsPickerResult {
    [key: string]: any;
}
/**
 * 选部门
 * @apiName biz.contact.departmentsPicker
 * @supportVersion  pc: 4.2.5 ios: 3.0 android: 3.0
 */
export declare function departmentsPicker$(params: IBizContactDepartmentsPickerParams): Promise<IBizContactDepartmentsPickerResult>;
export default departmentsPicker$;
