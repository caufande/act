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
exports.QUERY_IS_NATIVE_SCRIPT = void 0;
const node_path_1 = __importDefault(require("node:path"));
const helper_1 = require("@tarojs/helper");
const utils_1 = require("../utils");
exports.QUERY_IS_NATIVE_SCRIPT = '?isNative';
const etsSetCache = new WeakMap();
const chunkSetCache = new WeakMap();
const importAndRequireRegex = /(?:import\s|from\s|require\()['"]([^'"\s]+)['"]\)?/g;
function default_1(viteCompilerContext) {
    return __awaiter(this, void 0, void 0, function* () {
        const name = 'taro:vite-ets';
        const { taroConfig, cwd: appPath } = viteCompilerContext;
        let etsSet;
        let chunkSet;
        let viteConfig;
        return {
            name,
            enforce: 'pre',
            configResolved(config) {
                viteConfig = config;
            },
            buildStart() {
                if (etsSetCache.has(viteConfig)) {
                    etsSet = etsSetCache.get(viteConfig);
                }
                else {
                    etsSet = new Set();
                    etsSetCache.set(viteConfig, etsSet);
                }
                if (chunkSetCache.has(viteConfig)) {
                    chunkSet = chunkSetCache.get(viteConfig);
                }
                else {
                    chunkSet = new Set();
                    chunkSetCache.set(viteConfig, chunkSet);
                }
            },
            resolveId(source) {
                // 判断是否为 ets id，是的话转换成虚拟模块
                if (utils_1.virtualModulePrefixREG.test(source))
                    return null;
                if (source.endsWith(exports.QUERY_IS_NATIVE_SCRIPT)) {
                    const id = (0, utils_1.appendVirtualModulePrefix)(source);
                    etsSet.add(id);
                    return id;
                }
                return null;
            },
            load(id) {
                if (etsSet.has(id)) {
                    // 获取虚拟模块的真实路径的内容
                    const idWithoutVirtualPrefix = (0, utils_1.stripVirtualModulePrefix)(id.split('?')[0]);
                    const code = helper_1.fs.readFileSync(idWithoutVirtualPrefix, 'utf-8');
                    return code;
                }
                return null;
            },
            transform(code, id) {
                // 判断是否为虚拟 ets 模块，不是则退出
                if (etsSet.has(id)) {
                    let match;
                    const realId = (0, utils_1.stripVirtualModulePrefix)(id.split('?')[0]);
                    while ((match = importAndRequireRegex.exec(code)) !== null) {
                        const moduleRelativePath = match[1];
                        const modulePath = (0, helper_1.resolveSync)(moduleRelativePath, { basedir: node_path_1.default.dirname(realId), extensions: ['.js', '.ts', '.ets'] });
                        if (modulePath && !modulePath.includes('node_modules')) {
                            const isETS = modulePath.endsWith('.ets');
                            const fileName = node_path_1.default.relative(viteCompilerContext.sourceDir, modulePath);
                            if (!chunkSet.has(fileName)) {
                                this.emitFile({
                                    type: 'chunk',
                                    id: isETS ? modulePath + exports.QUERY_IS_NATIVE_SCRIPT : modulePath,
                                    fileName: isETS ? fileName + exports.QUERY_IS_NATIVE_SCRIPT : fileName,
                                });
                                if (!isETS) {
                                    chunkSet.add(fileName);
                                }
                            }
                        }
                    }
                    const etsPath = node_path_1.default.relative(viteCompilerContext.sourceDir, realId);
                    if (!chunkSet.has(etsPath)) {
                        this.emitFile({
                            code,
                            type: 'prebuilt-chunk',
                            fileName: etsPath
                        });
                        chunkSet.add(etsPath);
                    }
                    return {
                        code: 'export default "This is virtual ets module!"',
                        map: null
                    };
                }
            },
            generateBundle(_, bundle) {
                Object.keys(bundle).forEach(key => {
                    if (key.includes(exports.QUERY_IS_NATIVE_SCRIPT)) {
                        delete bundle[key];
                    }
                });
            },
            renderChunk(code, chunk, opts) {
                var _a;
                // TODO ETS 文件改为 prebuilt-chunk 输出，输出前 resolve 依赖
                const id = chunk.facadeModuleId || chunk.fileName;
                const etsSuffix = /\.ets(\?\S*)?$/;
                if (etsSuffix.test(id) || etsSuffix.test(chunk.fileName) || ((_a = chunk.moduleIds) === null || _a === void 0 ? void 0 : _a.some(id => etsSuffix.test(id)))) {
                    opts.__vite_skip_esbuild__ = true;
                }
                const { outputRoot = 'dist', sourceRoot = 'src' } = taroConfig;
                code = (0, utils_1.resolveAbsoluteRequire)({
                    name,
                    importer: id,
                    code,
                    outputRoot,
                    targetRoot: node_path_1.default.resolve(appPath, sourceRoot),
                    resolve: this.resolve,
                    modifyResolveId: viteCompilerContext.loaderMeta.modifyResolveId,
                });
                return {
                    code,
                    map: null,
                };
            },
            // Note: 识别项目内 ets 文件并注入到 Harmony 项目中
        };
    });
}
exports.default = default_1;
//# sourceMappingURL=ets.js.map