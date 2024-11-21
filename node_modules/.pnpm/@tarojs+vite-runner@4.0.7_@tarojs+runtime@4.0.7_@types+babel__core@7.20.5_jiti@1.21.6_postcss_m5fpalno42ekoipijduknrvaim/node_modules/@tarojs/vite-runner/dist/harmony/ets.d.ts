import type { ViteHarmonyCompilerContext } from '@tarojs/taro/types/compile/viteCompilerContext';
import type { Plugin } from 'vite';
export declare const QUERY_IS_NATIVE_SCRIPT = "?isNative";
export default function (viteCompilerContext: ViteHarmonyCompilerContext): Promise<Plugin>;
