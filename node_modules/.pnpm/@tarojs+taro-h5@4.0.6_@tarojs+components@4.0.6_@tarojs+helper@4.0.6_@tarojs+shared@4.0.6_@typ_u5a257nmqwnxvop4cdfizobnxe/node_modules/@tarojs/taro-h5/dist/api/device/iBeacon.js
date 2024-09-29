import { temporarilyNotSupport } from '../../utils/index.js';

// 蓝牙-信标(Beacon)
const stopBeaconDiscovery = /* @__PURE__ */ temporarilyNotSupport('stopBeaconDiscovery');
const startBeaconDiscovery = /* @__PURE__ */ temporarilyNotSupport('startBeaconDiscovery');
const onBeaconUpdate = /* @__PURE__ */ temporarilyNotSupport('onBeaconUpdate');
const onBeaconServiceChange = /* @__PURE__ */ temporarilyNotSupport('onBeaconServiceChange');
const offBeaconUpdate = /* @__PURE__ */ temporarilyNotSupport('offBeaconUpdate');
const offBeaconServiceChange = /* @__PURE__ */ temporarilyNotSupport('offBeaconServiceChange');
const getBeacons = /* @__PURE__ */ temporarilyNotSupport('getBeacons');

export { getBeacons, offBeaconServiceChange, offBeaconUpdate, onBeaconServiceChange, onBeaconUpdate, startBeaconDiscovery, stopBeaconDiscovery };
//# sourceMappingURL=iBeacon.js.map
