import throttle from 'lodash-es/throttle';
import { CallbackManager, MethodHandler } from '../../utils/handler.js';

const callbackManager = new CallbackManager();
let devicemotionListener;
/**
 * 停止监听加速度数据。
 */
const stopAccelerometer = ({ success, fail, complete } = {}) => {
    const res = {};
    const handle = new MethodHandler({ name: 'stopAccelerometer', success, fail, complete });
    try {
        window.removeEventListener('devicemotion', devicemotionListener, true);
        return handle.success(res);
    }
    catch (e) {
        res.errMsg = e.message;
        return handle.fail(res);
    }
};
const INTERVAL_MAP = {
    game: {
        interval: 20,
        frequency: 50
    },
    ui: {
        interval: 60,
        frequency: 16.67
    },
    normal: {
        interval: 200,
        frequency: 5
    }
};
/**
 * 开始监听加速度数据。
 */
const startAccelerometer = ({ interval = 'normal', success, fail, complete } = {}) => {
    const handle = new MethodHandler({ name: 'startAccelerometer', success, fail, complete });
    try {
        if (window.DeviceMotionEvent) {
            const intervalObj = INTERVAL_MAP[interval];
            if (devicemotionListener) {
                stopAccelerometer();
            }
            devicemotionListener = throttle((evt) => {
                var _a, _b, _c;
                callbackManager.trigger({
                    x: ((_a = evt.acceleration) === null || _a === void 0 ? void 0 : _a.x) || 0,
                    y: ((_b = evt.acceleration) === null || _b === void 0 ? void 0 : _b.y) || 0,
                    z: ((_c = evt.acceleration) === null || _c === void 0 ? void 0 : _c.z) || 0
                });
            }, intervalObj.interval);
            window.addEventListener('devicemotion', devicemotionListener, true);
        }
        else {
            throw new Error('accelerometer is not supported');
        }
        return handle.success();
    }
    catch (e) {
        return handle.fail({ errMsg: e.message });
    }
};
/**
 * 监听加速度数据事件。频率根据 Taro.startAccelerometer() 的 interval 参数。可使用 Taro.stopAccelerometer() 停止监听。
 */
const onAccelerometerChange = callback => {
    callbackManager.add(callback);
};
/**
 * 取消监听加速度数据事件，参数为空，则取消所有的事件监听
 */
const offAccelerometerChange = callback => {
    callbackManager.remove(callback);
};

export { offAccelerometerChange, onAccelerometerChange, startAccelerometer, stopAccelerometer };
//# sourceMappingURL=accelerometer.js.map
