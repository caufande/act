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
const node_path_1 = __importDefault(require("node:path"));
const helper_1 = require("@tarojs/helper");
const connect_history_api_fallback_1 = __importDefault(require("connect-history-api-fallback"));
const postcss_h5_1 = require("../postcss/postcss.h5");
const utils_1 = require("../utils");
const constants_1 = require("../utils/constants");
const html_1 = require("../utils/html");
function default_1(viteCompilerContext) {
    var _a;
    const { pages, taroConfig, cwd: appPath, sourceDir, app } = viteCompilerContext;
    const basename = ((_a = taroConfig.router) === null || _a === void 0 ? void 0 : _a.basename) || '';
    const htmlTemplate = helper_1.fs.readFileSync(node_path_1.default.join(appPath, taroConfig.sourceRoot || 'src', 'index.html')).toString();
    const isProd = (0, utils_1.getMode)(taroConfig) === 'production';
    const __postcssOption = (0, postcss_h5_1.getDefaultPostcssConfig)({
        designWidth: taroConfig.designWidth,
        deviceRatio: taroConfig.deviceRatio,
        option: taroConfig.postcss,
        esnextModules: taroConfig.esnextModules || []
    });
    const [, pxtransformOption] = __postcssOption.find(([name]) => name === 'postcss-pxtransform') || [];
    function createRewire(reg, baseUrl, proxyUrlKeys) {
        return {
            from: new RegExp(`/${reg}.html`),
            to({ parsedUrl }) {
                const pathname = parsedUrl.pathname;
                const excludeBaseUrl = pathname.replace(baseUrl, '/');
                const template = node_path_1.default.resolve(baseUrl, 'index.html');
                if (excludeBaseUrl === '/') {
                    return template;
                }
                const isApiUrl = proxyUrlKeys.some((item) => pathname.startsWith(node_path_1.default.resolve(baseUrl, item)));
                return isApiUrl ? excludeBaseUrl : template;
            },
        };
    }
    function getIsHtmlEntry(pathName) {
        return pages.some(({ name }) => {
            const pageName = (0, helper_1.removeHeadSlash)(node_path_1.default.join(basename, name));
            const htmlPath = node_path_1.default.join(appPath, taroConfig.sourceRoot || 'src', `${pageName}.html`);
            return htmlPath === pathName;
        });
    }
    function getInput() {
        const input = {};
        pages.forEach((page) => {
            const { name } = page;
            const pageName = (0, helper_1.removeHeadSlash)(node_path_1.default.join(basename, name));
            const htmlPath = node_path_1.default.join(appPath, taroConfig.sourceRoot || 'src', `${pageName}.html`);
            input[pageName] = htmlPath;
        });
        return input;
    }
    return {
        name: 'taro:vite-h5-mpa',
        enforce: 'pre',
        buildStart() {
            const getRoutesConfig = (pageName) => {
                const page = pages.find(({ name }) => name === pageName) || pages[0];
                const routesConfig = [
                    'config.routes = []',
                    `config.route = ${(0, utils_1.genRouterResource)(page)}`,
                    `config.pageName = "${pageName}"`
                ].join('\n');
                return routesConfig;
            };
            viteCompilerContext.routerMeta = {
                routerCreator: 'createMultiRouter',
                getRoutesConfig
            };
        },
        config: () => ({
            build: {
                rollupOptions: {
                    input: getInput(),
                    output: {
                        entryFileNames: (chunkInfo) => `js/${chunkInfo.name}.[hash].js`
                    }
                }
            }
        }),
        configureServer(server) {
            var _a;
            const rewrites = [];
            const proxy = server.config.server.proxy || {};
            const proxyKeys = Object.keys(proxy);
            const baseUrl = (_a = server.config.base) !== null && _a !== void 0 ? _a : '/';
            pages.forEach(({ name }) => {
                const pageName = (0, helper_1.removeHeadSlash)(node_path_1.default.join(basename, name));
                rewrites.push(createRewire(pageName, baseUrl, proxyKeys));
            });
            server.middlewares.use((0, connect_history_api_fallback_1.default)({
                disableDotRule: undefined,
                htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
                rewrites: rewrites
            }));
        },
        resolveId(source, importer, options) {
            return __awaiter(this, void 0, void 0, function* () {
                // 处理 html 文件
                const isEntry = getIsHtmlEntry(source);
                if (isEntry)
                    return source;
                // 处理 config.ts 入口文件
                const resolved = yield this.resolve(source, importer, Object.assign(Object.assign({}, options), { skipSelf: true }));
                if ((resolved === null || resolved === void 0 ? void 0 : resolved.id) && pages.some(({ configPath }) => resolved.id.startsWith(configPath))) {
                    // mpa 模式，入口文件为每个page下的config
                    const queryParams = (0, utils_1.getQueryParams)(source);
                    const pageName = queryParams === null || queryParams === void 0 ? void 0 : queryParams[constants_1.PAGENAME_QUERY];
                    const pureId = node_path_1.default.parse(resolved.id).dir;
                    const params = {
                        [constants_1.ENTRY_QUERY]: 'true',
                        [constants_1.PAGENAME_QUERY]: pageName
                    };
                    const queryString = (0, utils_1.generateQueryString)(params);
                    return (0, utils_1.appendVirtualModulePrefix)(pureId + `?${queryString}`);
                }
                return null;
            });
        },
        load(id) {
            // 处理 html 文件
            const isEntryHtml = getIsHtmlEntry(id);
            if (isEntryHtml)
                return htmlTemplate;
        },
        transformIndexHtml: {
            enforce: 'pre',
            transform(html, ctx) {
                var _a, _b;
                const { originalUrl, path: filePath } = ctx;
                const { configPath } = app;
                let srciptSource = configPath.replace(sourceDir, '');
                let page;
                if (isProd) {
                    page = (_a = pages.filter(({ name }) => filePath === null || filePath === void 0 ? void 0 : filePath.startsWith(`/${(0, helper_1.removeHeadSlash)(node_path_1.default.join(basename, name))}`))) === null || _a === void 0 ? void 0 : _a[0];
                }
                else {
                    page = (_b = pages.filter(({ name }) => originalUrl === null || originalUrl === void 0 ? void 0 : originalUrl.startsWith(`/${(0, helper_1.removeHeadSlash)(node_path_1.default.join(basename, name))}`))) === null || _b === void 0 ? void 0 : _b[0];
                }
                if (page) {
                    const params = { [constants_1.PAGENAME_QUERY]: page.name };
                    const queryString = (0, utils_1.generateQueryString)(params);
                    srciptSource = page.configPath.replace(sourceDir, '') + `?${queryString}`;
                }
                const htmlScript = (0, html_1.getHtmlScript)(srciptSource, pxtransformOption);
                return html.replace(/<script><%= htmlWebpackPlugin.options.script %><\/script>/, htmlScript);
            }
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=mpa.js.map