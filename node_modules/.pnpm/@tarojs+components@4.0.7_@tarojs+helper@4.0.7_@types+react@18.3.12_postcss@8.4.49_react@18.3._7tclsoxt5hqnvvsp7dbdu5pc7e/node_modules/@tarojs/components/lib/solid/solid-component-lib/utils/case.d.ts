export declare const camelToDashCase: (str: string) => string;
export declare const isPropNameAnEvent: (propName: string) => boolean;
export declare const isReactiveKey: <T extends Record<string, any>>(obj: T, key: keyof T) => () => any;
