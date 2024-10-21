import { isUndefined, isFunction } from '@tarojs/shared';

function timeoutInterceptor(chain) {
    const requestParams = chain.requestParams;
    let p;
    const res = new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            clearTimeout(timeout);
            reject(new Error('网络链接超时,请稍后再试！'));
        }, (requestParams && requestParams.timeout) || 60000);
        p = chain.proceed(requestParams);
        p
            .then(res => {
            if (!timeout)
                return;
            clearTimeout(timeout);
            resolve(res);
        })
            .catch(err => {
            timeout && clearTimeout(timeout);
            reject(err);
        });
    });
    // @ts-ignore
    if (!isUndefined(p) && isFunction(p.abort))
        res.abort = p.abort;
    return res;
}
function logInterceptor(chain) {
    const requestParams = chain.requestParams;
    const { method, data, url } = requestParams;
    // eslint-disable-next-line no-console
    console.log(`http ${method || 'GET'} --> ${url} data: `, data);
    const p = chain.proceed(requestParams);
    const res = p
        .then(res => {
        // eslint-disable-next-line no-console
        console.log(`http <-- ${url} result:`, res);
        return res;
    });
    // @ts-ignore
    if (isFunction(p.abort))
        res.abort = p.abort;
    return res;
}

export { logInterceptor, timeoutInterceptor };
//# sourceMappingURL=interceptors.js.map
