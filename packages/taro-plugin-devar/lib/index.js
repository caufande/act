/**@import { IPluginContext } from '@tarojs/service' */

/**
 * @typedef {{}} PluginOpts
 */

/**
 * 编译过程扩展
 * @license AGPL-3.0-or-later
 * @param {IPluginContext} ctx
 * @param {PluginOpts} pluginOpts
 */
function plugin(ctx, pluginOpts) {
	ctx.modifyBuildAssets(({ assets, miniPlugin }) => {
		console.log('修改编译后的结果');
		const vendors = assets['vendors.js'];
		const source = vendors.source();
		// 必须要改 `assets` 的属性，才能触发 Proxy
		const idx = source.indexOf('\n') + 1;
		assets['vendors.js'] = { source: () => `${source.slice(0, idx)}(()=>{${source.slice(idx)}})();` };
	});
};

module.exports = plugin;
module.exports.default = plugin;
