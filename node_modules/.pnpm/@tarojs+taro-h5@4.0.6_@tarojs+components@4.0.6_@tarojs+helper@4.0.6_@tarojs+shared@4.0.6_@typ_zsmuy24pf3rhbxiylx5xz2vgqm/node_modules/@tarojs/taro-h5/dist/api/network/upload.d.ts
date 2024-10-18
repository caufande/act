import Taro from '@tarojs/api';
/**
 * 将本地资源上传到服务器。客户端发起一个 HTTPS POST 请求，其中 content-type 为 multipart/form-data。使用前请注意阅读相关说明。
 */
declare const uploadFile: typeof Taro.uploadFile;
export { uploadFile };
