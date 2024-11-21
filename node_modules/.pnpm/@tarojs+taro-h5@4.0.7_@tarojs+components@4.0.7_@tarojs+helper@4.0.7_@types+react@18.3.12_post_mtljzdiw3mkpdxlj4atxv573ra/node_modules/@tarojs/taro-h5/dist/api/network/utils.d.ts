/**
 * HTTP Response Header 事件回调函数的参数
 * @typedef {Object} HeadersReceivedParam
 * @property {Object} header 开发者服务器返回的 HTTP Response Header
 */
/**
 * HTTP Response Header 事件的回调函数
 * @callback HeadersReceivedCallback
 * @param {HeadersReceivedParam} res 参数
 */
/**
 * 进度变化回调函数的参数
 * @typedef {Object} ProgressUpdateParam
 * @property {number} progress 进度百分比
 * @property {number} [totalBytesWritten] 已经下载的数据长度，单位 Bytes
 * @property {number} [totalBytesSent] 已经上传的数据长度，单位 Bytes
 * @property {number} [totalBytesExpectedToWrite] 预期需要下载的数据总长度，单位 Bytes
 * @property {number} [totalBytesExpectedToSend] 预期需要上传的数据总长度，单位 Bytes
 */
/**
 * 进度变化事件的回调函数
 * @callback ProgressUpdateCallback
 * @param {ProgressUpdateParam} res 参数
 */
declare const NETWORK_TIMEOUT = 60000;
declare const XHR_STATS: {
    UNSENT: number;
    OPENED: number;
    HEADERS_RECEIVED: number;
    LOADING: number;
    DONE: number;
};
/**
 * 设置xhr的header
 * @param {XMLHttpRequest} xhr
 * @param {Object} header
 */
declare const setHeader: (xhr: any, header: any) => void;
/**
 * 将 blob url 转化为文件
 * @param {string} url 要转换的 blob url
 * @returns {Promise<File>}
 */
declare const convertObjectUrlToBlob: (url: any) => Promise<unknown>;
export { NETWORK_TIMEOUT, XHR_STATS, setHeader, convertObjectUrlToBlob };
