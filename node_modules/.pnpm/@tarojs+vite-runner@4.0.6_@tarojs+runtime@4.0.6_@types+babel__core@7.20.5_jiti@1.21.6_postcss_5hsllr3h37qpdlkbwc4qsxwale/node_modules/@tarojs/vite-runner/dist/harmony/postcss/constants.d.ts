export declare const CSS_LANGS_RE: RegExp;
export declare const JSX_TSX_LANGS_RE: RegExp;
export declare const SPECIAL_QUERY_RE: RegExp;
export declare const enum PreprocessLang {
    less = "less",
    sass = "sass",
    scss = "scss",
    styl = "styl",
    stylus = "stylus"
}
export declare const enum PureCssLang {
    css = "css"
}
export declare const enum PostCssDialectLang {
    sss = "sugarss"
}
export type CssLang = keyof typeof PureCssLang | keyof typeof PreprocessLang | keyof typeof PostCssDialectLang;
export declare const cssUrlRE: RegExp;
export declare const cssDataUriRE: RegExp;
export declare const importCssRE: RegExp;
export declare const cssImageSetRE: RegExp;
export declare const cssNotProcessedRE: RegExp;
export declare const cssModuleRE: RegExp;
export declare const cssGlobalModuleRE: RegExp;
export declare const htmlProxyRE: RegExp;
export declare const commonjsProxyRE: RegExp;
export declare const inlineRE: RegExp;
export declare const inlineCSSRE: RegExp;
export declare const usedRE: RegExp;
export declare const varRE: RegExp;
export declare const loadParseImportRE: RegExp;
export declare const publicAssetUrlRE: RegExp;
