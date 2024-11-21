/**
 * 用户组表达式相关
 * @license AGPL-3.0-or-later
 */
declare module './groupExpr';
export declare enum Operation {
    And = 0,
    Or = 1,
    Not = 2
}
export type BinOperationArr = readonly [Operation.And | Operation.Or, GroupExpr, GroupExpr];
export type NotArr = readonly [Operation.Not, GroupExpr];
export type GroupExpr = BinOperationArr | NotArr | string;
export declare const GroupExpr: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TAny, import("@sinclair/typebox").TAny]>;
export declare function assertGroupExpr(n: unknown): asserts n is GroupExpr;
export default function getGroupExpr(n: string | readonly string[]): GroupExpr;
