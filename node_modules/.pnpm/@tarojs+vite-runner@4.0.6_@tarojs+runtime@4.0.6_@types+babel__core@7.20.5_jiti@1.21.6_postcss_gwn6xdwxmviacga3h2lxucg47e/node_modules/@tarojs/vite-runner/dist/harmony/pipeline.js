"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const runner_utils_1 = require("@tarojs/runner-utils");
const shared_1 = require("@tarojs/shared");
function default_1(viteCompilerContext) {
    const { taroConfig } = viteCompilerContext;
    return {
        name: 'taro:vite-harmony-pipeline',
        enforce: 'pre',
        buildStart() {
            this.load({ id: runner_utils_1.VITE_COMPILER_LABEL });
            const info = this.getModuleInfo(runner_utils_1.VITE_COMPILER_LABEL);
            if (info) {
                info.meta = { viteCompilerContext };
                viteCompilerContext.watchConfigFile(this);
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
        }
    };
}
exports.default = default_1;
//# sourceMappingURL=pipeline.js.map