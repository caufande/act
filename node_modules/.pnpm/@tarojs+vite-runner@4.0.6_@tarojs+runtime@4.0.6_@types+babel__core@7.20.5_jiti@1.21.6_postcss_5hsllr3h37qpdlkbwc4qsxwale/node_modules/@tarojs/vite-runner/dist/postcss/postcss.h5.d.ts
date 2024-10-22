import type { Func } from '@tarojs/taro/types/compile';
export declare const getDefaultPostcssConfig: ({ designWidth, deviceRatio, option, esnextModules }: {
    designWidth: any;
    deviceRatio: any;
    option?: (import("@tarojs/taro/types/compile").IBasePostcssOption & {
        url?: import("@tarojs/taro/types/compile").PostcssOption.url | undefined;
    }) | undefined;
    esnextModules: any;
}) => [string, any, Func?][];
