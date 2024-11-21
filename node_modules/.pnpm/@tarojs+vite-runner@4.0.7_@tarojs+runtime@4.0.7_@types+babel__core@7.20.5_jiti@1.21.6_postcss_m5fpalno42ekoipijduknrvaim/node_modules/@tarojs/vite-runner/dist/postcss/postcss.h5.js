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
const helper_1 = require("@tarojs/helper");
const platform = 'h5';
const defaultConstparseOption = {
    constants: [
        {
            key: 'taro-tabbar-height',
            val: '50PX'
        }
    ],
    platform
};
const taroModuleRgx = [/@tarojs[/\\_]components/, /\btaro-components\b/];
const defaultEsnextModuleRgx = [
    /@tarojs[/\\_]components/,
    /\btaro-components\b/,
    /@tarojs[/\\_]taro-h5/,
    /\btaro-h5\b/,
    /@tarojs[/\\_]router/,
    /\btaro-router\b/
];
const isTaroModule = (filename) => taroModuleRgx.some(reg => reg.test(filename));
const isEsnextModule = (filename, esnextModules) => {
    const esnextModuleRules = [...defaultEsnextModuleRgx, ...esnextModules];
    return esnextModuleRules.some(pattern => {
        if (pattern instanceof RegExp) {
            return pattern.test(filename);
        }
        else {
            return filename.indexOf(pattern) > -1;
        }
    });
};
const getPostcssExclude = (esnextModules) => {
    return (filename) => {
        if (isTaroModule(filename)) {
            return true;
        }
        else if (isEsnextModule(filename, esnextModules)) {
            return false;
        }
        else {
            return (0, helper_1.isNodeModule)(filename);
        }
    };
};
const getDefaultPostcssConfig = function ({ designWidth, deviceRatio, option = {}, esnextModules }) {
    const { autoprefixer, htmltransform, pxtransform = {} } = option, options = __rest(option, ["autoprefixer", "htmltransform", "pxtransform"]);
    if (designWidth) {
        pxtransform.config.designWidth = designWidth;
    }
    if (deviceRatio) {
        pxtransform.config.deviceRatio = deviceRatio;
    }
    // 由于 vite 缺少 postcss 文件的 filter 能力，所以只能针对 postcss-pxtransform 这个插件，在内部进行 filter，后面跟进 vite 的特性可以进行修改
    pxtransform.config.exclude = getPostcssExclude(esnextModules);
    return [
        ['autoprefixer', autoprefixer, require('autoprefixer')],
        ['postcss-pxtransform', pxtransform, require('postcss-pxtransform')],
        ['postcss-html-transform', htmltransform, require('postcss-html-transform')],
        ['postcss-plugin-constparse', defaultConstparseOption, require('postcss-plugin-constparse')],
        ...Object.entries(options)
    ];
};
exports.getDefaultPostcssConfig = getDefaultPostcssConfig;
//# sourceMappingURL=postcss.h5.js.map