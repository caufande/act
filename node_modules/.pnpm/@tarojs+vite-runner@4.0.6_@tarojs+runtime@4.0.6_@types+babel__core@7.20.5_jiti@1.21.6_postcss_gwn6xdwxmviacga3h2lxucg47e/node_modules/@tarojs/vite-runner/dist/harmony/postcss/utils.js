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
exports.requireResolveFromRootWithFallback = exports.combineSourcemaps = exports.processSrcSet = exports.generateCodeFrame = exports.stripBomTag = exports.finalizeCss = exports.fixScssBugImportValue = exports.cleanScssBugUrl = exports.doUrlReplace = exports.rewriteCssDataUris = exports.rewriteCssUrls = exports.rewriteImportCss = exports.asyncReplace = exports.removeDirectQuery = exports.isExternalUrl = exports.cleanUrl = void 0;
const node_module_1 = require("node:module");
const remapping_1 = __importDefault(require("@ampproject/remapping"));
const helper_1 = require("@tarojs/helper");
const magic_string_1 = __importDefault(require("magic-string"));
const constants_1 = require("./constants");
const postfixRE = /[?#].*$/s;
function cleanUrl(url) {
    return url.replace(postfixRE, '');
}
exports.cleanUrl = cleanUrl;
const externalRE = /^(https?:)?\/\//;
const isExternalUrl = (url) => externalRE.test(url);
exports.isExternalUrl = isExternalUrl;
const dataUrlRE = /^\s*data:/i;
const isDataUrl = (url) => dataUrlRE.test(url);
const directRequestRE = /(\?|&)direct=?(?:&|$)/;
const trailingSeparatorRE = /[?&]$/;
function removeDirectQuery(url) {
    return url.replace(directRequestRE, '$1').replace(trailingSeparatorRE, '');
}
exports.removeDirectQuery = removeDirectQuery;
function asyncReplace(input, re, replacer) {
    return __awaiter(this, void 0, void 0, function* () {
        let match;
        let remaining = input;
        let rewritten = '';
        while ((match = re.exec(remaining))) {
            rewritten += remaining.slice(0, match.index);
            rewritten += yield replacer(match);
            remaining = remaining.slice(match.index + match[0].length);
        }
        rewritten += remaining;
        return rewritten;
    });
}
exports.asyncReplace = asyncReplace;
function rewriteImportCss(css, replacer) {
    return asyncReplace(css, constants_1.importCssRE, (match) => __awaiter(this, void 0, void 0, function* () {
        const [matched, rawUrl] = match;
        return yield doImportCSSReplace(rawUrl, matched, replacer);
    }));
}
exports.rewriteImportCss = rewriteImportCss;
function rewriteCssUrls(css, replacer) {
    return asyncReplace(css, constants_1.cssUrlRE, (match) => __awaiter(this, void 0, void 0, function* () {
        const [matched, rawUrl] = match;
        return yield doUrlReplace(rawUrl.trim(), matched, replacer);
    }));
}
exports.rewriteCssUrls = rewriteCssUrls;
function rewriteCssDataUris(css, replacer) {
    return asyncReplace(css, constants_1.cssDataUriRE, (match) => __awaiter(this, void 0, void 0, function* () {
        const [matched, rawUrl] = match;
        return yield doUrlReplace(rawUrl.trim(), matched, replacer, 'data-uri');
    }));
}
exports.rewriteCssDataUris = rewriteCssDataUris;
function doUrlReplace(rawUrl_1, matched_1, replacer_1) {
    return __awaiter(this, arguments, void 0, function* (rawUrl, matched, replacer, funcName = 'url') {
        let wrap = '';
        const first = rawUrl[0];
        if (first === `"` || first === `'`) {
            wrap = first;
            rawUrl = rawUrl.slice(1, -1);
        }
        if ((0, exports.isExternalUrl)(rawUrl) ||
            isDataUrl(rawUrl) ||
            rawUrl.startsWith('#') ||
            constants_1.varRE.test(rawUrl)) {
            return matched;
        }
        const newUrl = yield replacer(rawUrl);
        if (wrap === '' && newUrl !== encodeURI(newUrl)) {
            // The new url might need wrapping even if the original did not have it, e.g. if a space was added during replacement
            wrap = "'";
        }
        return `${funcName}(${wrap}${newUrl}${wrap})`;
    });
}
exports.doUrlReplace = doUrlReplace;
function doImportCSSReplace(rawUrl, matched, replacer) {
    return __awaiter(this, void 0, void 0, function* () {
        let wrap = '';
        const first = rawUrl[0];
        if (first === `"` || first === `'`) {
            wrap = first;
            rawUrl = rawUrl.slice(1, -1);
        }
        if ((0, exports.isExternalUrl)(rawUrl) || isDataUrl(rawUrl) || rawUrl.startsWith('#')) {
            return matched;
        }
        return `@import ${wrap}${yield replacer(rawUrl)}${wrap}`;
    });
}
// in unix, scss might append `location.href` in environments that shim `location`
// see https://github.com/sass/dart-sass/issues/710
function cleanScssBugUrl(url) {
    if (
    // check bug via `window` and `location` global
    typeof window !== 'undefined' &&
        typeof location !== 'undefined' &&
        typeof (location === null || location === void 0 ? void 0 : location.href) === 'string') {
        const prefix = location.href.replace(/\/$/, '');
        return url.replace(prefix, '');
    }
    else {
        return url;
    }
}
exports.cleanScssBugUrl = cleanScssBugUrl;
function fixScssBugImportValue(data) {
    // the scss bug doesn't load files properly so we have to load it ourselves
    // to prevent internal error when it loads itself
    if (
    // check bug via `window` and `location` global
    typeof window !== 'undefined' &&
        typeof location !== 'undefined' &&
        data &&
        'file' in data &&
        (!('contents' in data) || data.contents == null)) {
        // @ts-expect-error we need to preserve file property for HMR
        data.contents = fs.readFileSync(data.file, 'utf-8');
    }
    return data;
}
exports.fixScssBugImportValue = fixScssBugImportValue;
function finalizeCss(css) {
    return __awaiter(this, void 0, void 0, function* () {
        // hoist external @imports and @charset to the top of the CSS chunk per spec (#1845 and #6333)
        if (css.includes('@import') || css.includes('@charset')) {
            css = yield hoistAtRules(css);
        }
        return css;
    });
}
exports.finalizeCss = finalizeCss;
// Taken from https://stackoverflow.com/a/36328890
const multilineCommentsRE = /\/\*[^*]*\*+(?:[^/*][^*]*\*+)*\//g;
function emptyCssComments(raw) {
    return raw.replace(multilineCommentsRE, (s) => ' '.repeat(s.length));
}
function hoistAtRules(css) {
    return __awaiter(this, void 0, void 0, function* () {
        const s = new magic_string_1.default(css);
        const cleanCss = emptyCssComments(css);
        let match;
        // #1845
        // CSS @import can only appear at top of the file. We need to hoist all @import
        // to top when multiple files are concatenated.
        // match until semicolon that's not in quotes
        const atImportRE = /@import(?:\s*(?:url\([^)]*\)|"(?:[^"]|(?<=\\)")*"|'(?:[^']|(?<=\\)')*').*?|[^;]*);/g;
        while ((match = atImportRE.exec(cleanCss))) {
            s.remove(match.index, match.index + match[0].length);
            // Use `appendLeft` instead of `prepend` to preserve original @import order
            s.appendLeft(0, match[0]);
        }
        // #6333
        // CSS @charset must be the top-first in the file, hoist the first to top
        const atCharsetRE = /@charset(?:\s*(?:"(?:[^"]|(?<=\\)")*"|'(?:[^']|(?<=\\)')*').*?|[^;]*);/g;
        let foundCharset = false;
        while ((match = atCharsetRE.exec(cleanCss))) {
            s.remove(match.index, match.index + match[0].length);
            if (!foundCharset) {
                s.prepend(match[0]);
                foundCharset = true;
            }
        }
        return s.toString();
    });
}
function stripBomTag(content) {
    return content.charCodeAt(0) === 0xfeff ? content.slice(1) : content;
}
exports.stripBomTag = stripBomTag;
const splitRE = /\r?\n/;
const range = 2;
function posToNumber(source, pos) {
    if (typeof pos === 'number')
        return pos;
    const lines = source.split(splitRE);
    const { line, column } = pos;
    let start = 0;
    for (let i = 0; i < line - 1 && i < lines.length; i++) {
        start += lines[i].length + 1;
    }
    return start + column;
}
function generateCodeFrame(source, start = 0, end) {
    start = posToNumber(source, start);
    end = end || start;
    const lines = source.split(splitRE);
    let count = 0;
    const res = [];
    for (let i = 0; i < lines.length; i++) {
        count += lines[i].length + 1;
        if (count >= start) {
            for (let j = i - range; j <= i + range || end > count; j++) {
                if (j < 0 || j >= lines.length)
                    continue;
                const line = j + 1;
                res.push(`${line}${' '.repeat(Math.max(3 - String(line).length, 0))}|  ${lines[j]}`);
                const lineLength = lines[j].length;
                if (j === i) {
                    // push underline
                    const pad = Math.max(start - (count - lineLength) + 1, 0);
                    const length = Math.max(1, end > count ? lineLength - pad : end - start);
                    res.push(`   |  ` + ' '.repeat(pad) + '^'.repeat(length));
                }
                else if (j > i) {
                    if (end > count) {
                        const length = Math.max(Math.min(end - count, lineLength), 1);
                        res.push(`   |  ` + '^'.repeat(length));
                    }
                    count += lineLength + 1;
                }
            }
            break;
        }
    }
    return res.join('\n');
}
exports.generateCodeFrame = generateCodeFrame;
const escapedSpaceCharacters = /( |\\t|\\n|\\f|\\r)+/g;
const imageSetUrlRE = /^(?:[\w-]+\(.*?\)|'.*?'|".*?"|\S*)/;
function reduceSrcset(ret) {
    return ret.reduce((prev, { url, descriptor }, index) => {
        descriptor !== null && descriptor !== void 0 ? descriptor : (descriptor = '');
        return (prev +=
            url + ` ${descriptor}${index === ret.length - 1 ? '' : ', '}`);
    }, '');
}
function splitSrcSetDescriptor(srcs) {
    return splitSrcSet(srcs)
        .map((s) => {
        const src = s.replace(escapedSpaceCharacters, ' ').trim();
        const [url] = imageSetUrlRE.exec(src) || [''];
        return {
            url,
            descriptor: src === null || src === void 0 ? void 0 : src.slice(url.length).trim(),
        };
    })
        .filter(({ url }) => !!url);
}
function processSrcSet(srcs, replacer) {
    return Promise.all(splitSrcSetDescriptor(srcs).map((_a) => __awaiter(this, [_a], void 0, function* ({ url, descriptor }) {
        return ({
            url: yield replacer({ url, descriptor }),
            descriptor,
        });
    }))).then((ret) => reduceSrcset(ret));
}
exports.processSrcSet = processSrcSet;
const blankReplacer = (match) => ' '.repeat(match.length);
const cleanSrcSetRE = /(?:url|image|gradient|cross-fade)\([^)]*\)|"([^"]|(?<=\\)")*"|'([^']|(?<=\\)')*'/g;
function splitSrcSet(srcs) {
    const parts = [];
    // There could be a ',' inside of url(data:...), linear-gradient(...) or "data:..."
    const cleanedSrcs = srcs.replace(cleanSrcSetRE, blankReplacer);
    let startIndex = 0;
    let splitIndex;
    do {
        splitIndex = cleanedSrcs.indexOf(',', startIndex);
        parts.push(srcs.slice(startIndex, splitIndex !== -1 ? splitIndex : undefined));
        startIndex = splitIndex + 1;
    } while (splitIndex !== -1);
    return parts;
}
const windowsDriveRE = /^[A-Z]:/;
const replaceWindowsDriveRE = /^([A-Z]):\//;
const linuxAbsolutePathRE = /^\/[^/]/;
function escapeToLinuxLikePath(path) {
    if (windowsDriveRE.test(path)) {
        return path.replace(replaceWindowsDriveRE, '/windows/$1/');
    }
    if (linuxAbsolutePathRE.test(path)) {
        return `/linux${path}`;
    }
    return path;
}
const revertWindowsDriveRE = /^\/windows\/([A-Z])\//;
function unescapeToLinuxLikePath(path) {
    if (path.startsWith('/linux/')) {
        return path.slice('/linux'.length);
    }
    if (path.startsWith('/windows/')) {
        return path.replace(revertWindowsDriveRE, '$1:/');
    }
    return path;
}
// based on https://github.com/sveltejs/svelte/blob/abf11bb02b2afbd3e4cac509a0f70e318c306364/src/compiler/utils/mapped_code.ts#L221
function combineSourcemaps(filename, sourcemapList) {
    if (sourcemapList.length === 0 ||
        sourcemapList.every((m) => m.sources.length === 0)) {
        return {
            names: [],
            sources: [],
            mappings: '',
            version: 3,
        };
    }
    // hack for parse broken with normalized absolute paths on windows (C:/path/to/something).
    // escape them to linux like paths
    // also avoid mutation here to prevent breaking plugin's using cache to generate sourcemaps like vue (see #7442)
    sourcemapList = sourcemapList.map((sourcemap) => {
        const newSourcemaps = Object.assign({}, sourcemap);
        newSourcemaps.sources = sourcemap.sources.map((source) => source ? escapeToLinuxLikePath(source) : null);
        if (sourcemap.sourceRoot) {
            newSourcemaps.sourceRoot = escapeToLinuxLikePath(sourcemap.sourceRoot);
        }
        return newSourcemaps;
    });
    const escapedFilename = escapeToLinuxLikePath(filename);
    // We don't declare type here so we can convert/fake/map as RawSourceMap
    let map; // : SourceMap
    let mapIndex = 1;
    const useArrayInterface = sourcemapList.slice(0, -1).find((m) => m.sources.length !== 1) === undefined;
    if (useArrayInterface) {
        map = (0, remapping_1.default)(sourcemapList, () => null);
    }
    else {
        map = (0, remapping_1.default)(sourcemapList[0], function loader(sourcefile) {
            if (sourcefile === escapedFilename && sourcemapList[mapIndex]) {
                return sourcemapList[mapIndex++];
            }
            else {
                return null;
            }
        });
    }
    if (!map.file) {
        delete map.file;
    }
    // unescape the previous hack
    map.sources = map.sources.map((source) => source ? unescapeToLinuxLikePath(source) : source);
    map.file = filename;
    return map;
}
exports.combineSourcemaps = combineSourcemaps;
// TODO: use import()
const _require = (0, node_module_1.createRequire)(__filename);
const requireResolveFromRootWithFallback = (root, id) => {
    // check existence first, so if the package is not found,
    // it won't be cached by nodejs, since there isn't a way to invalidate them:
    // https://github.com/nodejs/node/issues/44663
    const found = (0, helper_1.resolveSync)(id, {
        basedir: root
    }) || (0, helper_1.resolveSync)(id, {
        basedir: __dirname
    });
    if (!found) {
        const error = new Error(`${JSON.stringify(id)} not found.`);
        error.code = 'MODULE_NOT_FOUND';
        throw error;
    }
    // actually resolve
    // Search in the root directory first, and fallback to the default require paths.
    return _require.resolve(id, { paths: [root, __dirname] });
};
exports.requireResolveFromRootWithFallback = requireResolveFromRootWithFallback;
//# sourceMappingURL=utils.js.map