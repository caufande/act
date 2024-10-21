import type { ViteHarmonyCompilerContext } from '@tarojs/taro/types/compile/viteCompilerContext';
import type { PluginOption } from 'vite';
export declare const ENTRY_SUFFIX = "?entry-loader=true";
export declare const TARO_COMP_SUFFIX = "_taro_comp";
export default function (viteCompilerContext: ViteHarmonyCompilerContext): PluginOption;
