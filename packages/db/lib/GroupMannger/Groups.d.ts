/**
 * 用户组相关
 * @license AGPL-3.0-or-later
 */
declare module './Groups';
export interface Group {
    readonly dads: readonly string[];
    readonly tags: readonly string[];
    readonly hash: string | null;
}
export declare const Group: import("@sinclair/typebox").TObject<{
    dads: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
    tags: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
    hash: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNull, import("@sinclair/typebox").TString]>;
}>;
export declare enum ArraySpliter {
    First = ",",
    Second = "|"
}
type SerializedGroup = readonly [
    name: string,
    dads: readonly string[],
    tags: readonly string[],
    hash: string | null
];
type SerializedGroups = SerializedGroup[];
export default class Groups extends Map<string, Group> {
    static assert(n: unknown): asserts n is Groups;
    static serializer(n: Groups): SerializedGroups;
    static deserializer(n: SerializedGroups): Groups;
    constructor(sheet?: string | null);
    parse(sheet: string): void;
    protected parseLine(line: string, lineNumber: number): void;
}
export {};
