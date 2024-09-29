import { shouldBeObject, processOpenApi } from '../../utils/index.js';
import { CallbackManager, MethodHandler } from '../../utils/handler.js';
import { isGeolocationSupported } from './utils.js';

const _successCbManager = new CallbackManager();
const _errorCbManager = new CallbackManager();
let _watchID = -1;
function onLocationChange(callback) {
    _successCbManager.add(callback);
}
function offLocationChange(callback) {
    if (callback && typeof callback === 'function') {
        _successCbManager.remove(callback);
    }
    else if (callback === undefined) {
        _successCbManager.clear();
    }
    else {
        console.warn('offLocationChange failed');
    }
}
function onLocationChangeError(callback) {
    _errorCbManager.add(callback);
}
function offLocationChangeError(callback) {
    if (callback && typeof callback === 'function') {
        _errorCbManager.remove(callback);
    }
    else if (callback === undefined) {
        _errorCbManager.clear();
    }
    else {
        console.warn('offLocationChangeError failed');
    }
}
/**
 * 开始监听位置信息
 * @param opts
 * @returns
 */
function startLocationUpdateByW3CApi(opts) {
    // 断言 options 必须是 Object
    const isObject = shouldBeObject(opts);
    if (!isObject.flag) {
        const res = { errMsg: `startLocationUpdate:fail ${isObject.msg}` };
        console.error(res.errMsg);
        return Promise.reject(res);
    }
    const { success, fail, complete } = opts;
    const handle = new MethodHandler({ name: 'startLocationUpdate', success, fail, complete });
    // 判断当前浏览器是否支持位置API
    if (!isGeolocationSupported()) {
        return handle.fail({
            errMsg: 'The current browser does not support this feature'
        });
    }
    try {
        if (_watchID > -1) {
            console.error('startLocationUpdate:fail');
            return handle.fail();
        }
        else {
            _watchID = navigator.geolocation.watchPosition(({ coords }) => {
                const { latitude, longitude, altitude, accuracy, speed } = coords;
                _successCbManager.trigger({
                    accuracy,
                    altitude,
                    horizontalAccuracy: 0,
                    verticalAccuracy: 0,
                    latitude,
                    longitude,
                    speed,
                });
            }, err => {
                _errorCbManager.trigger({
                    errMsg: 'Watch Position error',
                    err
                });
            }, {
                timeout: 10,
                maximumAge: 0,
                enableHighAccuracy: true,
            });
            return handle.success();
        }
    }
    catch (error) {
        return handle.fail();
    }
}
/**
 * 停止监听位置信息
 * @param opts
 * @returns
 */
function stopLocationUpdateByW3CApi(opts) {
    const isObject = shouldBeObject(opts);
    if (!isObject.flag) {
        const res = { errMsg: `stopLocationUpdate:fail ${isObject.msg}` };
        console.error(res.errMsg);
        return Promise.reject(res);
    }
    const { success, fail, complete } = opts;
    const handle = new MethodHandler({ name: 'stopLocationUpdate', success, fail, complete });
    // 判断当前浏览器是否支持位置API
    if (!isGeolocationSupported()) {
        return handle.fail({
            errMsg: 'The current browser does not support this feature'
        });
    }
    try {
        navigator.geolocation.clearWatch(_watchID);
        _watchID = -1;
        return handle.success();
    }
    catch (error) {
        return handle.fail();
    }
}
const stopLocationUpdate = /* @__PURE__ */ processOpenApi({
    name: 'stopLocationUpdate',
    standardMethod: stopLocationUpdateByW3CApi
});
const startLocationUpdate = /* @__PURE__ */ processOpenApi({
    name: 'startLocationUpdate',
    standardMethod: startLocationUpdateByW3CApi
});

export { offLocationChange, offLocationChangeError, onLocationChange, onLocationChangeError, startLocationUpdate, stopLocationUpdate };
//# sourceMappingURL=locationChange.js.map
