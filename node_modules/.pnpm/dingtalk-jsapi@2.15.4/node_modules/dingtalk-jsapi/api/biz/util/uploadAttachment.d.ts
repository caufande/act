/**
 * 附件上传 请求参数定义
 * @apiName biz.util.uploadAttachment
 */
export interface IBizUtilUploadAttachmentParams {
    /** types这个数组里有photo、camera参数需要构建这个数据 */
    image?: {
        /** 是否多选，默认为false */
        multiple?: boolean;
        /** 是否压缩，默认为true */
        compress?: boolean;
        /** 最多选择的图片数目，最多支持9张 */
        max?: number;
        /** 企业自定义空间 */
        spaceId: string;
    };
    space?: {
        /** 企业ID */
        corpId: string;
        /** 企业自定义空间 */
        spaceId: string;
        /** 1复制，0不复制 */
        isCopy?: number;
        /** 最多选择的图片数目，最多支持9张 */
        max?: number;
    };
    file: {
        /** 企业自定义空间 */
        spaceId: string;
        /** 最多选择的图片数目，最多支持9张 */
        max?: number;
    };
    /** 支持上传附件的文件类型，至少一个，最多支持四种类型 */
    types: Array<'photo' | 'camera' | 'file' | 'space'>;
}
/**
 * 附件上传 返回结果定义
 * @apiName biz.util.uploadAttachment
 */
export interface IBizUtilUploadAttachmentResult {
    /** 用户选择了哪种文件类型 ，image（图片）、file（手机文件）、space（钉盘文件） */
    type: 'photo' | 'camera' | 'file' | 'space';
    /** 文件上传成功后的数据信息 */
    data: Array<{
        /** 目标空间id */
        spaceId: string;
        /** 文件id */
        fileId: string;
        /** 文件名称 */
        fileName: string;
        /** 文件大小 */
        fileSize: number;
        /** 文件类型 */
        fileType: string;
    }>;
}
/**
 * 附件上传
 * 该接口支持照片，拍照，本地系统文件和从已有钉盘文件选择，返回值为文件在钉盘系统内的数据信息
 * 例如SpaceID、FileID等。其中照片、拍照和本地系统文件将先上传到参数SpaceID指定的钉盘空间再返回
 * 上传过程对开发者透明。为此调用该接口前需先获取企业自定义空间并授予当前用户对该空间的上传操作权限。
 * 获取自定义空间与授权参见服务端开发文档中“获取企业下自定义空间”和“授权用户访问企业下自定义空间”接口
 * @apiName biz.util.uploadAttachment
 * @supportVersion  pc: 3.0.0 ios: 2.7.0 android: 2.7.0
 */
export declare function uploadAttachment$(params: IBizUtilUploadAttachmentParams): Promise<IBizUtilUploadAttachmentResult>;
export default uploadAttachment$;
