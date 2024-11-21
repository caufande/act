declare function makeMap(str: string, expectsLowerCase?: boolean): (key: string) => boolean;
declare const specialMiniElements: {
    img: string;
    iframe: string;
};
declare const isMiniElements: (key: string) => boolean;
declare const isInlineElements: (key: string) => boolean;
declare const isBlockElements: (key: string) => boolean;
export { makeMap, specialMiniElements, isMiniElements, isInlineElements, isBlockElements };
