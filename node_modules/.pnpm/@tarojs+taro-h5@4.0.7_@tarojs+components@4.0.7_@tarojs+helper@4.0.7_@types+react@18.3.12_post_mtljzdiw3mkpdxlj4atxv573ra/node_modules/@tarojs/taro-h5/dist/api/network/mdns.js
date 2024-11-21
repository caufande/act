import { temporarilyNotSupport } from '../../utils/index.js';

// mDNS
const stopLocalServiceDiscovery = /* @__PURE__ */ temporarilyNotSupport('stopLocalServiceDiscovery');
const startLocalServiceDiscovery = /* @__PURE__ */ temporarilyNotSupport('startLocalServiceDiscovery');
const onLocalServiceResolveFail = /* @__PURE__ */ temporarilyNotSupport('onLocalServiceResolveFail');
const onLocalServiceLost = /* @__PURE__ */ temporarilyNotSupport('onLocalServiceLost');
const onLocalServiceFound = /* @__PURE__ */ temporarilyNotSupport('onLocalServiceFound');
const onLocalServiceDiscoveryStop = /* @__PURE__ */ temporarilyNotSupport('onLocalServiceDiscoveryStop');
const offLocalServiceResolveFail = /* @__PURE__ */ temporarilyNotSupport('offLocalServiceResolveFail');
const offLocalServiceLost = /* @__PURE__ */ temporarilyNotSupport('offLocalServiceLost');
const offLocalServiceFound = /* @__PURE__ */ temporarilyNotSupport('offLocalServiceFound');
const offLocalServiceDiscoveryStop = /* @__PURE__ */ temporarilyNotSupport('offLocalServiceDiscoveryStop');

export { offLocalServiceDiscoveryStop, offLocalServiceFound, offLocalServiceLost, offLocalServiceResolveFail, onLocalServiceDiscoveryStop, onLocalServiceFound, onLocalServiceLost, onLocalServiceResolveFail, startLocalServiceDiscovery, stopLocalServiceDiscovery };
//# sourceMappingURL=mdns.js.map
