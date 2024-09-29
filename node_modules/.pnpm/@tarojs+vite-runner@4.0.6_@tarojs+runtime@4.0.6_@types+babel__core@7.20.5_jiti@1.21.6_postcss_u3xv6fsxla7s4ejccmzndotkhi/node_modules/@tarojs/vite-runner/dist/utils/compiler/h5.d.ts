import { CompilerContext } from './base';
import type { PageConfig } from '@tarojs/taro';
import type { ViteH5BuildConfig, ViteH5CompilerContext } from '@tarojs/taro/types/compile/viteCompilerContext';
export declare class TaroCompilerContext extends CompilerContext<ViteH5BuildConfig> implements ViteH5CompilerContext {
    routerMeta: {
        routerCreator: string;
        getRoutesConfig: (pageName?: string) => string;
    };
    browserslist: string[];
    constructor(appPath: string, taroConfig: ViteH5BuildConfig);
    processConfig(): void;
    getAppScriptPath(): string;
    compilePage: (pageName: string) => {
        name: string;
        scriptPath: string;
        configPath: string;
        config: PageConfig;
        isNative: boolean;
    };
    getBrowserslist(): any;
}
