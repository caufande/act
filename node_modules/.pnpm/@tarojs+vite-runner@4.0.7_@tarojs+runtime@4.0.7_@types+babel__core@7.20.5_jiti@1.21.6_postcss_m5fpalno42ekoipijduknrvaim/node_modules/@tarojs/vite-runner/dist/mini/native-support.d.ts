import type { ViteMiniCompilerContext } from '@tarojs/taro/types/compile/viteCompilerContext';
import type { PluginContext } from 'rollup';
import type { PluginOption } from 'vite';
export declare const QUERY_IS_NATIVE_PAGE: string;
export declare const QUERY_IS_NATIVE_COMP: string;
export default function (viteCompilerContext: ViteMiniCompilerContext | undefined): PluginOption;
export declare function miniTemplateLoader(ctx: PluginContext, templatePath: string, sourceDir: string): string;
