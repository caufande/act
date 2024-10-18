"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileModePrePlugin = void 0;
const node_path_1 = __importDefault(require("node:path"));
const helper_1 = require("@tarojs/helper");
const utils_1 = require("../utils");
const constants_1 = require("./postcss/constants");
const render_1 = __importDefault(require("./template/render"));
const isTemplateRequest = (request) => !/\.ets(\?\S*)?$/.test(request) &&
    !constants_1.commonjsProxyRE.test(request) &&
    !constants_1.SPECIAL_QUERY_RE.test(request) &&
    !constants_1.loadParseImportRE.test(request) &&
    !constants_1.CSS_LANGS_RE.test(request) &&
    helper_1.REG_SCRIPTS.test(request);
let FILE_COUNTER = 0;
const FILE_COUNTER_MAP = new Map();
const etsTemplatesCache = new WeakMap();
function extractTaroTemplates(inputString) {
    const regex = /const\s(TARO_TEMPLATES_\w+)\s*=.*`([^`]+)`;/g;
    const templates = {};
    let match;
    while ((match = regex.exec(inputString)) !== null) {
        const key = match[1];
        const value = match[2];
        templates[key] = value;
    }
    const extractedString = inputString.replace(regex, '');
    return {
        templates,
        extractedString
    };
}
function compileModePrePlugin(viteCompilerContext) {
    let viteConfig;
    let etsTemplateCache;
    return {
        name: 'taro:vite-compile-mode',
        enforce: 'pre',
        configResolved(config) {
            viteConfig = config;
        },
        buildStart() {
            if (etsTemplatesCache.has(viteConfig)) {
                etsTemplateCache = etsTemplatesCache.get(viteConfig);
            }
            else {
                etsTemplateCache = new Map();
                etsTemplatesCache.set(viteConfig, etsTemplateCache);
            }
        },
        transform(source, id) {
            var _a, _b, _c;
            if (!isTemplateRequest(id) || !source.includes('compileMode'))
                return;
            const suffix = id.includes('?')
                ? id.slice(id.lastIndexOf('?'))
                : '';
            const resourcePath = (0, helper_1.resolveSync)(id.replace(suffix, ''), {
                basedir: viteCompilerContext.sourceDir,
                extensions: ['.jsx', '.tsx'],
            });
            if (!resourcePath)
                return;
            if (!FILE_COUNTER_MAP.has(resourcePath)) {
                FILE_COUNTER_MAP.set(resourcePath, FILE_COUNTER++);
            }
            const componentReplace = ((_c = (_b = (_a = viteCompilerContext.taroConfig) === null || _a === void 0 ? void 0 : _a.harmony) === null || _b === void 0 ? void 0 : _b.compileModeSetting) === null || _c === void 0 ? void 0 : _c.componentReplace) || {};
            const { code } = helper_1.swc.transformSync(source, {
                filename: resourcePath,
                sourceMaps: true,
                jsc: {
                    target: 'esnext',
                    parser: {
                        syntax: 'typescript',
                        tsx: true,
                        decorators: true,
                        dynamicImport: true
                    },
                    transform: {
                        legacyDecorator: true,
                        react: {
                            pragma: 'React.createElement',
                            pragmaFrag: 'React.Fragment',
                            throwIfNamespace: true,
                            development: false,
                            useBuiltins: false,
                            runtime: 'automatic',
                            importSource: 'react'
                        }
                    },
                    experimental: {
                        plugins: [
                            [
                                '@tarojs/helper/swc/swc_plugin_compile_mode.wasm',
                                {
                                    tmpl_prefix: `f${FILE_COUNTER_MAP.get(resourcePath)}`,
                                    is_harmony: true,
                                    component_replace: componentReplace,
                                    support_events: [
                                        'onLoad',
                                        'onClick',
                                        'onTouchEnd',
                                        'onTouchMove',
                                        'onTouchStart',
                                        'onTouchCancel'
                                    ],
                                    support_components: [
                                        'view',
                                        'text',
                                        'image'
                                    ],
                                    event_adapter: {
                                        onLoad: 'onComplete',
                                        onTouchEnd: 'onTouch',
                                        onTouchMove: 'onTouch',
                                        onTouchStart: 'onTouch',
                                        onTouchCancel: 'onTouch',
                                    }
                                }
                            ]
                        ]
                    }
                }
            });
            const { extractedString, templates } = extractTaroTemplates(code);
            // 遍历 templates, 输出 template 里的内容到 path.join(config.outputRoot, 'npm', '@tarojs/components/static/')
            for (const key in templates) {
                const name = `${key}.ets`;
                const fileName = node_path_1.default.join('static', name);
                const { cwd: appPath, loaderMeta, taroConfig } = viteCompilerContext;
                const { outputRoot = 'dist', sourceRoot = 'src' } = taroConfig;
                const { modifyResolveId } = loaderMeta;
                const template = (0, utils_1.resolveAbsoluteRequire)({
                    name,
                    importer: node_path_1.default.resolve(appPath, sourceRoot, fileName),
                    code: templates[key],
                    outputRoot,
                    targetRoot: node_path_1.default.resolve(appPath, sourceRoot),
                    resolve: this.resolve,
                    modifyResolveId,
                });
                etsTemplateCache.set(key, template);
                this.emitFile({
                    type: 'prebuilt-chunk',
                    code: template,
                    fileName,
                });
            }
            return { map: null, code: extractedString };
        },
        buildEnd() {
            const renderGenerator = new render_1.default(etsTemplateCache, viteCompilerContext);
            const fileName = 'render.ets';
            this.emitFile({
                type: 'prebuilt-chunk',
                code: renderGenerator.generate(fileName),
                fileName,
            });
        }
    };
}
exports.compileModePrePlugin = compileModePrePlugin;
//# sourceMappingURL=compile.js.map