"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../utils/index");
function default_1(viteCompilerContext) {
    const { pages, taroConfig } = viteCompilerContext;
    const { router } = taroConfig;
    const isMultiRouterMode = (router === null || router === void 0 ? void 0 : router.mode) === 'multi';
    return {
        name: 'taro:vite-h5-router',
        enforce: 'pre',
        buildStart() {
            if (isMultiRouterMode)
                return;
            const getRoutesConfig = () => [
                'config.routes = [',
                `${pages.map(page => (0, index_1.genRouterResource)(page)).join(',\n')}`,
                ']',
            ].join('\n');
            viteCompilerContext.routerMeta = {
                routerCreator: 'createRouter',
                getRoutesConfig
            };
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=router.js.map