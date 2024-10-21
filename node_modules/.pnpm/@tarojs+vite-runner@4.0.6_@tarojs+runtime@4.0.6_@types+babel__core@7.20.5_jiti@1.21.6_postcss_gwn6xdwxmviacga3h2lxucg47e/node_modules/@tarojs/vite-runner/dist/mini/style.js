"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
function default_1(viteCompilerContext) {
    return {
        name: 'taro:vite-style',
        generateBundle(_opts, bundle) {
            var _a;
            if (viteCompilerContext) {
                const nativeStyleExt = viteCompilerContext.fileType.style;
                const appStyleFileName = `app${nativeStyleExt}`;
                const commonStyleChunks = viteCompilerContext.commonChunks.map(item => `${item}${nativeStyleExt}`);
                const commonStyleFileNames = [];
                let appStyleChunk = null;
                for (const name in bundle) {
                    const chunk = bundle[name];
                    if (chunk.type === 'chunk') {
                        const importedCss = (_a = chunk.viteMetadata) === null || _a === void 0 ? void 0 : _a.importedCss;
                        if (importedCss && importedCss.size > 0) {
                            for (const item of importedCss) {
                                const chunkFileName = chunk.fileName;
                                const fileName = chunkFileName.replace(node_path_1.default.extname(chunkFileName), nativeStyleExt);
                                bundle[item].fileName = fileName;
                                if (fileName === appStyleFileName) {
                                    appStyleChunk = bundle[item];
                                }
                                else if (commonStyleChunks.includes(node_path_1.default.basename(fileName))) {
                                    commonStyleFileNames.push(fileName);
                                }
                            }
                        }
                    }
                }
                // 小程序全局样式文件中引入 common chunks 中的公共样式文件
                if (appStyleChunk) {
                    const APP_STYLE_NAME = 'app-origin' + nativeStyleExt;
                    const sourceDir = viteCompilerContext.sourceDir;
                    this.emitFile({
                        type: 'asset',
                        fileName: APP_STYLE_NAME,
                        source: appStyleChunk.source
                    });
                    appStyleChunk.source = commonStyleFileNames.reduce((prev, current) => {
                        return prev + `@import "${node_path_1.default.relative(sourceDir, node_path_1.default.join(sourceDir, current))}";\n`;
                    }, `@import "${APP_STYLE_NAME}";\n`);
                }
            }
        }
    };
}
exports.default = default_1;
//# sourceMappingURL=style.js.map