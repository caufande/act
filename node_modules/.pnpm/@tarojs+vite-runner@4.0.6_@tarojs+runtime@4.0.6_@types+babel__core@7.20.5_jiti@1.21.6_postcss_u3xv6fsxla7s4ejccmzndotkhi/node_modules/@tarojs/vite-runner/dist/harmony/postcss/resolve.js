"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvePostcssConfig = void 0;
const shared_1 = require("@tarojs/shared");
const postcss_load_config_1 = __importDefault(require("postcss-load-config"));
const postcssConfigCache = {};
function resolvePostcssConfig(config_1) {
    return __awaiter(this, arguments, void 0, function* (config, dialect = 'css') {
        var _a, _b;
        (_a = postcssConfigCache[dialect]) !== null && _a !== void 0 ? _a : (postcssConfigCache[dialect] = new WeakMap());
        let result = postcssConfigCache[dialect].get(config);
        if (result !== undefined) {
            return result;
        }
        // inline postcss config via vite config
        const inlineOptions = (_b = config.css) === null || _b === void 0 ? void 0 : _b.postcss;
        if ((0, shared_1.isObject)(inlineOptions)) {
            const options = Object.assign({}, inlineOptions);
            delete options.plugins;
            result = {
                options,
                plugins: inlineOptions.plugins || [],
            };
        }
        else {
            const searchPath = typeof inlineOptions === 'string' ? inlineOptions : config.root;
            try {
                result = yield (0, postcss_load_config_1.default)({}, searchPath);
            }
            catch (e) {
                if (!/No PostCSS Config found/.test(e.message)) {
                    if (e instanceof Error) {
                        const { name, message, stack } = e;
                        e.name = 'Failed to load PostCSS config';
                        e.message = `Failed to load PostCSS config (searchPath: ${searchPath}): [${name}] ${message}\n${stack}`;
                        e.stack = ''; // add stack to message to retain stack
                        throw e;
                    }
                    else {
                        throw new Error(`Failed to load PostCSS config: ${e}`);
                    }
                }
                result = null;
            }
        }
        postcssConfigCache[dialect].set(config, result);
        return result;
    });
}
exports.resolvePostcssConfig = resolvePostcssConfig;
//# sourceMappingURL=resolve.js.map