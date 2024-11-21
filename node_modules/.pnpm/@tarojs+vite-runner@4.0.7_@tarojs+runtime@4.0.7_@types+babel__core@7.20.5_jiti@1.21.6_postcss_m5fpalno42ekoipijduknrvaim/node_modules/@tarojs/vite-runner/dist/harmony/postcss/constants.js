"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicAssetUrlRE = exports.loadParseImportRE = exports.varRE = exports.usedRE = exports.inlineCSSRE = exports.inlineRE = exports.commonjsProxyRE = exports.htmlProxyRE = exports.cssGlobalModuleRE = exports.cssModuleRE = exports.cssNotProcessedRE = exports.cssImageSetRE = exports.importCssRE = exports.cssDataUriRE = exports.cssUrlRE = exports.PostCssDialectLang = exports.PureCssLang = exports.PreprocessLang = exports.SPECIAL_QUERY_RE = exports.JSX_TSX_LANGS_RE = exports.CSS_LANGS_RE = void 0;
exports.CSS_LANGS_RE = /\.(css|less|sass|scss|styl|stylus|pcss|postcss|sss)(?:$|\?)/;
exports.JSX_TSX_LANGS_RE = /\.(jsx|tsx)(?:$|\?)/;
exports.SPECIAL_QUERY_RE = /[?&](?:worker|sharedworker|raw|url)\b/;
var PreprocessLang;
(function (PreprocessLang) {
    PreprocessLang["less"] = "less";
    PreprocessLang["sass"] = "sass";
    PreprocessLang["scss"] = "scss";
    PreprocessLang["styl"] = "styl";
    PreprocessLang["stylus"] = "stylus";
})(PreprocessLang || (exports.PreprocessLang = PreprocessLang = {}));
var PureCssLang;
(function (PureCssLang) {
    PureCssLang["css"] = "css";
})(PureCssLang || (exports.PureCssLang = PureCssLang = {}));
var PostCssDialectLang;
(function (PostCssDialectLang) {
    PostCssDialectLang["sss"] = "sugarss";
})(PostCssDialectLang || (exports.PostCssDialectLang = PostCssDialectLang = {}));
// https://drafts.csswg.org/css-syntax-3/#identifier-code-point
exports.cssUrlRE = /(?<=^|[^\w\-\u0080-\uffff])url\((\s*('[^']+'|"[^"]+")\s*|[^'")]+)\)/;
exports.cssDataUriRE = /(?<=^|[^\w\-\u0080-\uffff])data-uri\((\s*('[^']+'|"[^"]+")\s*|[^'")]+)\)/;
exports.importCssRE = /@import ('[^']+\.css'|"[^"]+\.css"|[^'")]+\.css)/;
// Assuming a function name won't be longer than 256 chars
exports.cssImageSetRE = /(?<=image-set\()((?:[\w-]{1,256}\([^)]*\)|[^)])*)(?=\))/;
// TODO: image and cross-fade could contain a "url" that needs to be processed
// https://drafts.csswg.org/css-images-4/#image-notation
// https://drafts.csswg.org/css-images-4/#cross-fade-function
exports.cssNotProcessedRE = /(?:gradient|element|cross-fade|image)\(/;
exports.cssModuleRE = new RegExp(`\\.module${exports.CSS_LANGS_RE.source}`);
exports.cssGlobalModuleRE = new RegExp(`^(?!.*\\.global\\.).*${exports.CSS_LANGS_RE.source}`);
exports.htmlProxyRE = /(?:\?|&)html-proxy\b/;
exports.commonjsProxyRE = /\?commonjs-proxy/;
exports.inlineRE = /(?:\?|&)inline\b/;
exports.inlineCSSRE = /(?:\?|&)inline-css\b/;
exports.usedRE = /(?:\?|&)used/;
exports.varRE = /^var\(/i;
exports.loadParseImportRE = /(?:\?|&)load-parse-import\b/;
exports.publicAssetUrlRE = /__TARO_VITE_PUBLIC_ASSET__([a-z\d]{8})__/g;
//# sourceMappingURL=constants.js.map