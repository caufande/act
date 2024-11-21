export = plugin;
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
declare function plugin(ctx: IPluginContext, pluginOpts: PluginOpts): void;
declare namespace plugin {
    export { plugin as default, PluginOpts };
}
import type { IPluginContext } from '@tarojs/service';
type PluginOpts = {};
