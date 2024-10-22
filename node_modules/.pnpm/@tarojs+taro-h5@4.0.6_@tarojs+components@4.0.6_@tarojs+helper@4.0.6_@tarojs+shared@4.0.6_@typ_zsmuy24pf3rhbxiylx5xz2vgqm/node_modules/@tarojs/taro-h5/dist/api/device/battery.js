import { __awaiter } from 'tslib';
import { permanentlyNotSupport } from '../../utils/index.js';
import { MethodHandler } from '../../utils/handler.js';

// 电量
// Note: 浏览器标准下不支持，其他实现方案不准确，不建议开发者使用
const getBatteryInfoSync = /* @__PURE__ */ permanentlyNotSupport('getBatteryInfoSync');
const getBatteryInfo = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* ({ success, fail, complete } = {}) {
    var _a;
    const handle = new MethodHandler({ name: 'getBatteryInfo', success, fail, complete });
    try {
        // @ts-ignore
        const battery = yield ((_a = navigator.getBattery) === null || _a === void 0 ? void 0 : _a.call(navigator));
        return handle.success({
            isCharging: battery.charging,
            level: Number(battery.level || 0) * 100
        });
    }
    catch (error) {
        return handle.fail({
            errMsg: (error === null || error === void 0 ? void 0 : error.message) || error
        });
    }
});

export { getBatteryInfo, getBatteryInfoSync };
//# sourceMappingURL=battery.js.map
