/**
 * 自然评论解析器
 * @license GPL-2.0-or-later
 */
declare module '.';
import { Comment } from '../CnbApi';
import { Act } from './Act';
export default function parseComment(comment: Comment): Promise<Act>;
