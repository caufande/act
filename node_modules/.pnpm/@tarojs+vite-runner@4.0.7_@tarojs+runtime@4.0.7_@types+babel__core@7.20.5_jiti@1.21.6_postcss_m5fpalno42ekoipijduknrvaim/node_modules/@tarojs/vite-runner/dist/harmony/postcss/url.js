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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlRewritePostcssPlugin = void 0;
const constants_1 = require("./constants");
const utils_1 = require("./utils");
function rewriteCssImageSet(css, replacer) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.asyncReplace)(css, constants_1.cssImageSetRE, (match) => __awaiter(this, void 0, void 0, function* () {
            const [, rawUrl] = match;
            const url = yield (0, utils_1.processSrcSet)(rawUrl, (_a) => __awaiter(this, [_a], void 0, function* ({ url }) {
                // the url maybe url(...)
                if (constants_1.cssUrlRE.test(url)) {
                    return yield (0, utils_1.rewriteCssUrls)(url, replacer);
                }
                if (!constants_1.cssNotProcessedRE.test(url)) {
                    return yield (0, utils_1.doUrlReplace)(url, url, replacer);
                }
                return url;
            }));
            return url;
        }));
    });
}
const UrlRewritePostcssPlugin = (opts) => {
    if (!opts) {
        throw new Error('base or replace is required');
    }
    return {
        postcssPlugin: 'taro:postcss-url-rewrite',
        Once(root) {
            const promises = [];
            root.walkDecls((declaration) => {
                var _a;
                const importer = (_a = declaration.source) === null || _a === void 0 ? void 0 : _a.input.file;
                if (!importer) {
                    opts.logger.warnOnce('\nA PostCSS plugin did not pass the `from` option to `postcss.parse`. ' +
                        'This may cause imported assets to be incorrectly transformed. ' +
                        "If you've recently added a PostCSS plugin that raised this warning, " +
                        'please contact the package author to fix the issue.');
                }
                const isCssUrl = constants_1.cssUrlRE.test(declaration.value);
                const isCssImageSet = constants_1.cssImageSetRE.test(declaration.value);
                if (isCssUrl || isCssImageSet) {
                    const replacerForDeclaration = (rawUrl) => {
                        return opts.replacer(rawUrl, importer);
                    };
                    const rewriterToUse = isCssImageSet
                        ? rewriteCssImageSet
                        : utils_1.rewriteCssUrls;
                    promises.push(rewriterToUse(declaration.value, replacerForDeclaration).then((url) => {
                        declaration.value = url;
                    }));
                }
            });
            if (promises.length) {
                return Promise.all(promises);
            }
        },
    };
};
exports.UrlRewritePostcssPlugin = UrlRewritePostcssPlugin;
exports.UrlRewritePostcssPlugin.postcss = true;
//# sourceMappingURL=url.js.map