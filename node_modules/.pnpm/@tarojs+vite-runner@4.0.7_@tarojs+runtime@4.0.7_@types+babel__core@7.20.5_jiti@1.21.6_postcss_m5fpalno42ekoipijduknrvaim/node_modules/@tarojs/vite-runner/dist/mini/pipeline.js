"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const runner_utils_1 = require("@tarojs/runner-utils");
const shared_1 = require("@tarojs/shared");
function default_1(viteCompilerContext) {
    const { taroConfig } = viteCompilerContext;
    return {
        name: 'taro:vite-mini-pipeline',
        enforce: 'pre',
        buildStart() {
            this.load({ id: runner_utils_1.VITE_COMPILER_LABEL });
            const info = this.getModuleInfo(runner_utils_1.VITE_COMPILER_LABEL);
            if (info) {
                info.meta = { viteCompilerContext };
                viteCompilerContext.watchConfigFile(this);
            }
            const { template, baseLevel = 16, experimental } = taroConfig;
            if (template.isSupportRecursive === false && baseLevel > 0) {
                template.baseLevel = baseLevel;
            }
            if ((experimental === null || experimental === void 0 ? void 0 : experimental.useXsForTemplate) === false) {
                template.isUseXS = false;
            }
            if ((experimental === null || experimental === void 0 ? void 0 : experimental.compileMode) === true) {
                template.isUseCompileMode = true;
            }
        },
        load(id) {
            if (id === runner_utils_1.VITE_COMPILER_LABEL)
                return '';
        },
        closeBundle() {
            const onBuildFinish = taroConfig.onBuildFinish;
            if ((0, shared_1.isFunction)(onBuildFinish)) {
                onBuildFinish({
                    error: null,
                    stats: {},
                    isWatch: taroConfig.isWatch
                });
            }
            // console.log('this.watchFiles: ', this.getWatchFiles())
        }
    };
}
exports.default = default_1;
//# sourceMappingURL=pipeline.js.map