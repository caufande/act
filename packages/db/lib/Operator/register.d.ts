/**
 * 操作器注册
 * @license AGPL-3.0-or-later
 */
declare module './register';
import Operator from '.';
export declare function regOperator(operator: Operator): void;
export declare function getOperator(): Operator;
