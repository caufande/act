import type { ViteHarmonyCompilerContext } from '@tarojs/taro/types/compile/viteCompilerContext';
import type { PluginOption } from 'vite';
export declare const PAGE_SUFFIX = "?page-loader=true";
export declare const TARO_TABBAR_PAGE_PATH = "taro_tabbar";
export default function (viteCompilerContext: ViteHarmonyCompilerContext): PluginOption;
