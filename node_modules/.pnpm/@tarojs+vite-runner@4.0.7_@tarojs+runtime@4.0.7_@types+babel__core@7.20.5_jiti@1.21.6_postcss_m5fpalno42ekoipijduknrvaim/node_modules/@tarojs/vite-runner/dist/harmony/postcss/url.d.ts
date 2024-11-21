import type * as PostCSS from 'postcss';
import type { Logger } from 'vite';
import type { CssUrlReplacer } from './types';
export declare const UrlRewritePostcssPlugin: PostCSS.PluginCreator<{
    replacer: CssUrlReplacer;
    logger: Logger;
}>;
