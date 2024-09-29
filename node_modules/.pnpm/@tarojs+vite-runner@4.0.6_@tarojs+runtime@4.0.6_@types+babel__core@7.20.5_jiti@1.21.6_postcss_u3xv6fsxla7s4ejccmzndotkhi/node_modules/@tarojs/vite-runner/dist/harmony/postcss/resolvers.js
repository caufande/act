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
exports.styl = exports.less = exports.sass = exports.scss = exports.loadPreprocessor = exports.getCssResolversKeys = exports.createCSSResolvers = exports.configToAtImportResolvers = void 0;
const node_module_1 = require("node:module");
const node_path_1 = __importDefault(require("node:path"));
const helper_1 = require("@tarojs/helper");
const magic_string_1 = __importDefault(require("magic-string"));
const vite_1 = require("vite");
const constants_1 = require("./constants");
const utils_1 = require("./utils");
exports.configToAtImportResolvers = new WeakMap();
function createCSSResolvers(config) {
    let cssResolve;
    let sassResolve;
    let lessResolve;
    return {
        get css() {
            return (cssResolve ||
                (cssResolve = config.createResolver({
                    extensions: ['.css'],
                    mainFields: ['style'],
                    conditions: ['style'],
                    tryIndex: false,
                    preferRelative: true,
                })));
        },
        get sass() {
            return (sassResolve ||
                (sassResolve = config.createResolver({
                    extensions: ['.scss', '.sass', '.css'],
                    mainFields: ['sass', 'style'],
                    conditions: ['sass', 'style'],
                    tryIndex: true,
                    tryPrefix: '_',
                    preferRelative: true,
                })));
        },
        get less() {
            return (lessResolve ||
                (lessResolve = config.createResolver({
                    extensions: ['.less', '.css'],
                    mainFields: ['less', 'style'],
                    conditions: ['less', 'style'],
                    tryIndex: false,
                    preferRelative: true,
                })));
        },
    };
}
exports.createCSSResolvers = createCSSResolvers;
function getCssResolversKeys(resolvers) {
    return Object.keys(resolvers);
}
exports.getCssResolversKeys = getCssResolversKeys;
const loadedPreprocessors = {};
// TODO: use dynamic import
const _require = (0, node_module_1.createRequire)(__filename);
function loadPreprocessor(lang, root) {
    if (lang in loadedPreprocessors) {
        return loadedPreprocessors[lang];
    }
    try {
        const resolved = (0, utils_1.requireResolveFromRootWithFallback)(root, lang);
        return (loadedPreprocessors[lang] = _require(resolved));
    }
    catch (e) {
        if (e.code === 'MODULE_NOT_FOUND') {
            throw new Error(`Preprocessor dependency "${lang}" not found. Did you install it?`);
        }
        else {
            const message = new Error(`Preprocessor dependency "${lang}" failed to load:\n${e.message}`);
            message.stack = e.stack + '\n' + message.stack;
            throw message;
        }
    }
}
exports.loadPreprocessor = loadPreprocessor;
// .scss/.sass processor
const scss = (source, root, options, resolvers) => __awaiter(void 0, void 0, void 0, function* () {
    const render = loadPreprocessor("sass" /* PreprocessLang.sass */, root).render;
    // NOTE: `sass` always runs it's own importer first, and only falls back to
    // the `importer` option when it can't resolve a path
    const internalImporter = (url, importer, done) => {
        importer = (0, utils_1.cleanScssBugUrl)(importer);
        resolvers.sass(url, importer).then((resolved) => {
            if (resolved) {
                rebaseUrls(resolved, options.filename, options.alias, '$')
                    .then((data) => done === null || done === void 0 ? void 0 : done((0, utils_1.fixScssBugImportValue)(data)))
                    .catch((data) => done === null || done === void 0 ? void 0 : done(data));
            }
            else {
                done === null || done === void 0 ? void 0 : done(null);
            }
        });
    };
    const importer = [internalImporter];
    if (options.importer) {
        Array.isArray(options.importer)
            ? importer.unshift(...options.importer)
            : importer.unshift(options.importer);
    }
    const { content: data, map: additionalMap } = yield getSource(source, options.filename, options.additionalData, options.enableSourcemap);
    const finalOptions = Object.assign(Object.assign(Object.assign({}, options), { data, file: options.filename, outFile: options.filename, importer }), (options.enableSourcemap
        ? {
            sourceMap: true,
            omitSourceMapUrl: true,
            sourceMapRoot: node_path_1.default.dirname(options.filename),
        }
        : {}));
    try {
        const result = yield new Promise((resolve, reject) => {
            render(finalOptions, (err, res) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res);
                }
            });
        });
        const deps = result.stats.includedFiles.map((f) => (0, utils_1.cleanScssBugUrl)(f));
        const map = result.map
            ? JSON.parse(result.map.toString())
            : undefined;
        return {
            code: result.css.toString(),
            map,
            additionalMap,
            deps,
        };
    }
    catch (e) {
        // normalize SASS error
        e.message = `[sass] ${e.message}`;
        e.id = e.file;
        e.frame = e.formatted;
        return { code: '', error: e, deps: [] };
    }
});
exports.scss = scss;
const sass = (source, root, options, aliasResolver) => (0, exports.scss)(source, root, Object.assign(Object.assign({}, options), { indentedSyntax: true }), aliasResolver);
exports.sass = sass;
/**
 * relative url() inside \@imported sass and less files must be rebased to use
 * root file as base.
 */
function rebaseUrls(file, rootFile, alias, variablePrefix) {
    return __awaiter(this, void 0, void 0, function* () {
        file = node_path_1.default.resolve(file); // ensure os-specific flashes
        // in the same dir, no need to rebase
        const fileDir = node_path_1.default.dirname(file);
        const rootDir = node_path_1.default.dirname(rootFile);
        if (fileDir === rootDir) {
            return { file };
        }
        const content = helper_1.fs.readFileSync(file, 'utf-8');
        // no url()
        const hasUrls = constants_1.cssUrlRE.test(content);
        // data-uri() calls
        const hasDataUris = constants_1.cssDataUriRE.test(content);
        // no @import xxx.css
        const hasImportCss = constants_1.importCssRE.test(content);
        if (!hasUrls && !hasDataUris && !hasImportCss) {
            return { file };
        }
        let rebased;
        const rebaseFn = (url) => {
            if (url.startsWith('/'))
                return url;
            // ignore url's starting with variable
            if (url.startsWith(variablePrefix))
                return url;
            // match alias, no need to rewrite
            for (const { find } of alias) {
                const matches = typeof find === 'string' ? url.startsWith(find) : find.test(url);
                if (matches) {
                    return url;
                }
            }
            const absolute = node_path_1.default.resolve(fileDir, url);
            const relative = node_path_1.default.relative(rootDir, absolute);
            return (0, vite_1.normalizePath)(relative);
        };
        // fix css imports in less such as `@import "foo.css"`
        if (hasImportCss) {
            rebased = yield (0, utils_1.rewriteImportCss)(content, rebaseFn);
        }
        if (hasUrls) {
            rebased = yield (0, utils_1.rewriteCssUrls)(rebased || content, rebaseFn);
        }
        if (hasDataUris) {
            rebased = yield (0, utils_1.rewriteCssDataUris)(rebased || content, rebaseFn);
        }
        return {
            file,
            contents: rebased,
        };
    });
}
// .less
const less = (source, root, options, resolvers) => __awaiter(void 0, void 0, void 0, function* () {
    const nodeLess = loadPreprocessor("less" /* PreprocessLang.less */, root);
    const viteResolverPlugin = createViteLessPlugin(nodeLess, options.filename, options.alias, resolvers);
    const { content, map: additionalMap } = yield getSource(source, options.filename, options.additionalData, options.enableSourcemap);
    let result;
    try {
        result = yield nodeLess.render(content, Object.assign(Object.assign(Object.assign({}, options), { plugins: [viteResolverPlugin, ...(options.plugins || [])] }), (options.enableSourcemap
            ? {
                sourceMap: {
                    outputSourceFiles: true,
                    sourceMapFileInline: false,
                },
            }
            : {})));
    }
    catch (e) {
        const error = e;
        // normalize error info
        const normalizedError = new Error(`[less] ${error.message || error.type}`);
        normalizedError.loc = {
            file: error.filename || options.filename,
            line: error.line,
            column: error.column,
        };
        return { code: '', error: normalizedError, deps: [] };
    }
    const map = result.map && JSON.parse(result.map);
    if (map) {
        delete map.sourcesContent;
    }
    return {
        code: result.css.toString(),
        map,
        additionalMap,
        deps: result.imports,
    };
});
exports.less = less;
/**
 * Less manager, lazy initialized
 */
let ViteLessManager;
function createViteLessPlugin(less, rootFile, alias, resolvers) {
    if (!ViteLessManager) {
        ViteLessManager = class ViteManager extends less.FileManager {
            constructor(rootFile, resolvers, alias) {
                super();
                this.rootFile = rootFile;
                this.resolvers = resolvers;
                this.alias = alias;
            }
            supports(filename) {
                return !(0, utils_1.isExternalUrl)(filename);
            }
            supportsSync() {
                return false;
            }
            loadFile(filename, dir, opts, env) {
                const _super = Object.create(null, {
                    loadFile: { get: () => super.loadFile }
                });
                return __awaiter(this, void 0, void 0, function* () {
                    const resolved = yield this.resolvers.less(filename, node_path_1.default.join(dir, '*'));
                    if (resolved) {
                        const result = yield rebaseUrls(resolved, this.rootFile, this.alias, '@');
                        let contents;
                        if (result && 'contents' in result) {
                            contents = result.contents;
                        }
                        else {
                            contents = helper_1.fs.readFileSync(resolved, 'utf-8');
                        }
                        return {
                            filename: node_path_1.default.resolve(resolved),
                            contents,
                        };
                    }
                    else {
                        return _super.loadFile.call(this, filename, dir, opts, env);
                    }
                });
            }
        };
    }
    return {
        install(_, pluginManager) {
            pluginManager.addFileManager(new ViteLessManager(rootFile, resolvers, alias));
        },
        minVersion: [3, 0, 0],
    };
}
// .styl
const styl = (source, root, options) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const nodeStylus = loadPreprocessor("stylus" /* PreprocessLang.stylus */, root);
    // Get source with preprocessor options.additionalData. Make sure a new line separator
    // is added to avoid any render error, as added stylus content may not have semi-colon separators
    const { content, map: additionalMap } = yield getSource(source, options.filename, options.additionalData, options.enableSourcemap, '\n');
    // Get preprocessor options.imports dependencies as stylus
    // does not return them with its builtin `.deps()` method
    const importsDeps = ((_a = options.imports) !== null && _a !== void 0 ? _a : []).map((dep) => node_path_1.default.resolve(dep));
    try {
        const ref = nodeStylus(content, options);
        if (options.define) {
            for (const key in options.define) {
                ref.define(key, options.define[key]);
            }
        }
        if (options.enableSourcemap) {
            ref.set('sourcemap', {
                comment: false,
                inline: false,
                basePath: root,
            });
        }
        const result = ref.render();
        // Concat imports deps with computed deps
        const deps = [...ref.deps(), ...importsDeps];
        const map = ref.sourcemap;
        return {
            code: result,
            map: formatStylusSourceMap(map, root),
            additionalMap,
            deps,
        };
    }
    catch (e) {
        e.message = `[stylus] ${e.message}`;
        return { code: '', error: e, deps: [] };
    }
});
exports.styl = styl;
function formatStylusSourceMap(mapBefore, root) {
    if (!mapBefore)
        return undefined;
    const map = Object.assign({}, mapBefore);
    const resolveFromRoot = (p) => (0, vite_1.normalizePath)(node_path_1.default.resolve(root, p));
    if (map.file) {
        map.file = resolveFromRoot(map.file);
    }
    map.sources = map.sources.map(resolveFromRoot);
    return map;
}
function getSource(source_1, filename_1, additionalData_1, enableSourcemap_1) {
    return __awaiter(this, arguments, void 0, function* (source, filename, additionalData, enableSourcemap, sep = '') {
        if (!additionalData)
            return { content: source };
        if (typeof additionalData === 'function') {
            const newContent = yield additionalData(source, filename);
            if (typeof newContent === 'string') {
                return { content: newContent };
            }
            return newContent;
        }
        if (!enableSourcemap) {
            return { content: additionalData + sep + source };
        }
        const ms = new magic_string_1.default(source);
        ms.appendLeft(0, sep);
        ms.appendLeft(0, additionalData);
        const map = ms.generateMap({ hires: true });
        map.file = filename;
        map.sources = [filename];
        return {
            content: ms.toString(),
            map,
        };
    });
}
//# sourceMappingURL=resolvers.js.map