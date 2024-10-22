"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
class BaseParser {
    constructor() {
        this.prettyPrintJson = utils_1.prettyPrintJson;
    }
    transArr2Str(array, prefixSpace = 0, connector = '\n') {
        return array
            .filter(e => typeof e === 'string' || (e instanceof Array && e.length > 0))
            .reduce((p, e) => `${p ? `${p}${connector}` : ''}${e instanceof Array ? this.transArr2Str(e, prefixSpace, connector) : `${' '.repeat(prefixSpace)}${e}`}`.replace(/(\x20*$)/g, ''), '');
    }
    getPxTransformConfig(buildConfig) {
        var _a;
        const pxTransformOption = ((_a = buildConfig.postcss) === null || _a === void 0 ? void 0 : _a.pxtransform) || {};
        const pxTransformConfig = pxTransformOption.config || {};
        pxTransformConfig.designWidth = buildConfig.designWidth;
        pxTransformConfig.deviceRatio = buildConfig.deviceRatio;
        return pxTransformConfig;
    }
    getInitPxTransform(buildConfig) {
        const pxTransformConfig = this.getPxTransformConfig(buildConfig);
        return this.transArr2Str([
            'initPxTransform({',
            this.transArr2Str([
                `designWidth: ${pxTransformConfig.designWidth},`,
                `deviceRatio: ${JSON.stringify(pxTransformConfig.deviceRatio)},`,
                `baseFontSize: ${pxTransformConfig.baseFontSize},`,
                `unitPrecision: ${pxTransformConfig.unitPrecision},`,
                `targetUnit: ${JSON.stringify(pxTransformConfig.targetUnit)},`,
            ], 2),
            '})',
        ]);
    }
}
exports.default = BaseParser;
//# sourceMappingURL=base.js.map