import { temporarilyNotSupport } from '../../utils/index.js';

// 蓝牙-低功耗外围设备
const onBLEPeripheralConnectionStateChanged = /* @__PURE__ */ temporarilyNotSupport('onBLEPeripheralConnectionStateChanged');
const offBLEPeripheralConnectionStateChanged = /* @__PURE__ */ temporarilyNotSupport('offBLEPeripheralConnectionStateChanged');
const createBLEPeripheralServer = /* @__PURE__ */ temporarilyNotSupport('createBLEPeripheralServer');

export { createBLEPeripheralServer, offBLEPeripheralConnectionStateChanged, onBLEPeripheralConnectionStateChanged };
//# sourceMappingURL=bluetooth-peripheral.js.map
