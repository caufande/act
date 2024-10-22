"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultPostcssConfig = void 0;
const getDefaultPostcssConfig = function ({ designWidth, deviceRatio, postcssOption = {} }) {
    const { autoprefixer, pxtransform = {}, htmltransform } = postcssOption, options = __rest(postcssOption, ["autoprefixer", "pxtransform", "htmltransform"]);
    if (designWidth) {
        pxtransform.config.designWidth = designWidth;
    }
    if (deviceRatio) {
        pxtransform.config.deviceRatio = deviceRatio;
    }
    return [
        ['autoprefixer', autoprefixer, require('autoprefixer')],
        ['postcss-pxtransform', pxtransform, require('postcss-pxtransform')],
        ['postcss-html-transform', htmltransform, require('postcss-html-transform')],
        ...Object.entries(options)
    ];
};
exports.getDefaultPostcssConfig = getDefaultPostcssConfig;
//# sourceMappingURL=postcss.mini.js.map