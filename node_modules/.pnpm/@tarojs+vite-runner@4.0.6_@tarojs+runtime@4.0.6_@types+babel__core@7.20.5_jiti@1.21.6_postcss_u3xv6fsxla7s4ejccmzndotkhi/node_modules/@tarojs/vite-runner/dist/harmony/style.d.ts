import type { ViteHarmonyCompilerContext } from '@tarojs/taro/types/compile/viteCompilerContext';
import type { Plugin } from 'vite';
export declare function stylePlugin(viteCompilerContext: ViteHarmonyCompilerContext): Promise<Plugin>;
export declare function stylePostPlugin(_viteCompilerContext: ViteHarmonyCompilerContext): Promise<Plugin>;
