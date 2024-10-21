/**
 * 一些实用小工具
 * @license GPL-2.0-or-later
 */
declare module '.';

import * as path from 'path';

export function noextname(name: string) {
	return path.basename(name).slice(0, -path.extname(name).length);
}

export function postfixFile(name: string, postfix: string, spliter = '-') {
	return `${path.dirname(name)}${path.sep}${noextname(name)}${spliter}${postfix}${path.extname(name)}`;
}
