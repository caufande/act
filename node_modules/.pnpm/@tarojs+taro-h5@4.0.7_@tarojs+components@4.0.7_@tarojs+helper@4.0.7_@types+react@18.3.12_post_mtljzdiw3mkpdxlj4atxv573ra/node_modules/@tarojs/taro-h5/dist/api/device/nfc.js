import { temporarilyNotSupport } from '../../utils/index.js';

// NFC
const stopHCE = /* @__PURE__ */ temporarilyNotSupport('stopHCE');
const startHCE = /* @__PURE__ */ temporarilyNotSupport('startHCE');
const sendHCEMessage = /* @__PURE__ */ temporarilyNotSupport('sendHCEMessage');
const onHCEMessage = /* @__PURE__ */ temporarilyNotSupport('onHCEMessage');
const offHCEMessage = /* @__PURE__ */ temporarilyNotSupport('offHCEMessage');
const getNFCAdapter = /* @__PURE__ */ temporarilyNotSupport('getNFCAdapter');
const getHCEState = /* @__PURE__ */ temporarilyNotSupport('getHCEState');

export { getHCEState, getNFCAdapter, offHCEMessage, onHCEMessage, sendHCEMessage, startHCE, stopHCE };
//# sourceMappingURL=nfc.js.map
