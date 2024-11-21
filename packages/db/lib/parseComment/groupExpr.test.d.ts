/**
 * 用户组表达式相关测试
 * @license AGPL-3.0-or-later
 */
declare module './groupExpr';
import { Operation } from '../../lib/parseComment/groupExpr';
export declare const demoGroupExpr: [Operation.Or, [Operation.And, [Operation.Not, [Operation.Not, string]], [Operation.And, string, [Operation.Not, string]]], [Operation.Or, [Operation.And, string, [Operation.Not, string]], string]];
