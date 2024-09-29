"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaroCompilerContext = void 0;
const node_path_1 = __importDefault(require("node:path"));
const helper_1 = require("@tarojs/helper");
const defaultConfig_h5_1 = __importDefault(require("../../defaultConfig/defaultConfig.h5"));
const base_1 = require("./base");
class TaroCompilerContext extends base_1.CompilerContext {
    constructor(appPath, taroConfig) {
        super(appPath, taroConfig);
        this.compilePage = (pageName) => {
            const { sourceDir, frameworkExts } = this;
            const scriptPath = (0, helper_1.resolveMainFilePath)(node_path_1.default.join(sourceDir, pageName), frameworkExts);
            const configPath = this.getConfigFilePath(scriptPath);
            const config = (0, helper_1.readConfig)(configPath, this.taroConfig) || {};
            const pageMeta = {
                name: pageName,
                scriptPath,
                configPath,
                config,
                isNative: false,
            };
            this.filesConfig[this.getConfigFilePath(pageMeta.name)] = {
                path: configPath,
                content: config
            };
            this.configFileList.push(pageMeta.configPath);
            return pageMeta;
        };
        this.app = this.getApp();
        this.pages = this.getPages();
        this.browserslist = this.getBrowserslist();
    }
    processConfig() {
        const staticDirectory = this.rawTaroConfig.staticDirectory || defaultConfig_h5_1.default.staticDirectory;
        defaultConfig_h5_1.default.imageUrlLoaderOption.name =
            (filename) => node_path_1.default.join(staticDirectory, 'images', node_path_1.default.basename(filename));
        defaultConfig_h5_1.default.fontUrlLoaderOption.name =
            (filename) => node_path_1.default.join(staticDirectory, 'fonts', node_path_1.default.basename(filename));
        defaultConfig_h5_1.default.mediaUrlLoaderOption.name =
            (filename) => node_path_1.default.join(staticDirectory, 'media', node_path_1.default.basename(filename));
        defaultConfig_h5_1.default.output.assetFileNames = ({ name }) => {
            if (!name)
                return '[ext]/[name].[hash][extname]';
            if (helper_1.REG_IMAGE.test(name))
                return `${staticDirectory}/images/${name}`;
            if (helper_1.REG_MEDIA.test(name))
                return `${staticDirectory}/media/${name}`;
            if (helper_1.REG_FONT.test(name))
                return `${staticDirectory}/fonts/${name}`;
            return '[ext]/[name].[hash][extname]';
        };
        this.taroConfig = (0, helper_1.recursiveMerge)({}, defaultConfig_h5_1.default, this.rawTaroConfig);
    }
    getAppScriptPath() {
        const entry = this.taroConfig.entry.app[0].replace(/\.config$/, '');
        return (0, helper_1.resolveScriptPath)(entry);
    }
    getBrowserslist() {
        const packageJsonPath = node_path_1.default.join(this.cwd, 'package.json');
        if (!helper_1.fs.existsSync(packageJsonPath)) {
            this.logger.error('缺少项目配置 package.json 文件，请检查是否是在taro项目中运行');
            process.exit(1);
        }
        let projectConfigString;
        try {
            projectConfigString = helper_1.fs.readFileSync(packageJsonPath, { encoding: 'utf-8' });
        }
        catch (error) {
            this.logger.error('解析项目配置文件 package.json 出错');
            this.logger.error(error);
            process.exit(1);
        }
        const projectConfig = JSON.parse(projectConfigString) || {};
        return (projectConfig === null || projectConfig === void 0 ? void 0 : projectConfig.browserslist) || ['last 3 versions', 'Android >= 4.1', 'ios >= 8'];
    }
}
exports.TaroCompilerContext = TaroCompilerContext;
//# sourceMappingURL=h5.js.map