/**
 * 自然评论解析器
 * @license AGPL-3.0-or-later
 */
declare module '.';
import { Comment } from '../CnbApi';
import getGroupExpr from './groupExpr';
import Act from './Act';
export * from './Act';
export * from './groupExpr';
export { Act, getGroupExpr };
export interface parseCommentOption {
    check?: boolean;
}
export default function parseComment(comment: Comment, option?: parseCommentOption): Act | {
    floor: number;
    title: string;
    detail: {
        details: any;
        title: string;
        strings: string[];
    };
    groupExpr: any;
    stages: {
        name: string;
        timeSteps: [Date, Date][];
        details: string[];
        partition: any;
    }[];
    id: number;
    author: string;
    authorUrl: string;
};
