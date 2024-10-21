import type { DecodedSourceMap, RawSourceMap } from '@ampproject/remapping';
import type Sass from 'sass';
import type { CssUrlReplacer } from './types';
export declare function cleanUrl(url: string): string;
export declare const isExternalUrl: (url: string) => boolean;
export declare function removeDirectQuery(url: string): string;
export declare function asyncReplace(input: string, re: RegExp, replacer: (match: RegExpExecArray) => string | Promise<string>): Promise<string>;
export declare function rewriteImportCss(css: string, replacer: CssUrlReplacer): Promise<string>;
export declare function rewriteCssUrls(css: string, replacer: CssUrlReplacer): Promise<string>;
export declare function rewriteCssDataUris(css: string, replacer: CssUrlReplacer): Promise<string>;
export declare function doUrlReplace(rawUrl: string, matched: string, replacer: CssUrlReplacer, funcName?: string): Promise<string>;
export declare function cleanScssBugUrl(url: string): string;
export declare function fixScssBugImportValue(data: Sass.ImporterReturnType): Sass.ImporterReturnType;
export declare function finalizeCss(css: string): Promise<string>;
export declare function stripBomTag(content: string): string;
export declare function generateCodeFrame(source: string, start?: number | {
    line: number;
    column: number;
}, end?: number): string;
interface ImageCandidate {
    url: string;
    descriptor: string;
}
export declare function processSrcSet(srcs: string, replacer: (arg: ImageCandidate) => Promise<string>): Promise<string>;
export declare function combineSourcemaps(filename: string, sourcemapList: Array<DecodedSourceMap | RawSourceMap>): RawSourceMap;
export declare const requireResolveFromRootWithFallback: (root: string, id: string) => string;
export {};
