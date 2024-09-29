import { processOpenApi } from '../../utils/index.js';

// 扫码
const scanCode = /* @__PURE__ */ processOpenApi({
    name: 'scanQRCode',
    defaultOptions: { needResult: 1 },
    formatResult: res => ({
        errMsg: res.errMsg === 'scanQRCode:ok' ? 'scanCode:ok' : res.errMsg,
        result: res.resultStr
    })
});

export { scanCode };
//# sourceMappingURL=scan.js.map
