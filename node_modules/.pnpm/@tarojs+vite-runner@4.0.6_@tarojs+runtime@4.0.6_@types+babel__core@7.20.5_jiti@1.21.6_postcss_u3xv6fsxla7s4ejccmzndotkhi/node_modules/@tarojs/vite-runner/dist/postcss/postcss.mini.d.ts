import type { Func } from '@tarojs/taro/types/compile';
export declare const getDefaultPostcssConfig: ({ designWidth, deviceRatio, postcssOption }: {
    designWidth: any;
    deviceRatio: any;
    postcssOption?: import("@tarojs/taro/types/compile").IBasePostcssOption | undefined;
}) => [string, any, Func?][];
