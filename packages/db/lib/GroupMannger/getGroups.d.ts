/**
 * 用户组工厂函数
 * @license AGPL-3.0-or-later
 */
declare module './getGroups';
import Groups from './Groups';
export default function getGroups(postHtml: string): Promise<Groups>;
