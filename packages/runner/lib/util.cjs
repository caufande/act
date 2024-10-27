/**
 * 一些实用小工具
 * @module
 * @license AGPL-3.0-or-later
 */
const obj = {
	/**
	 * @param {string} name
	 * @returns {string}
	 */
	noextname(name) {
		return path.basename(name).slice(0, -path.extname(name).length);
	},
	/**
	 * @param {string} name
	 * @param {string} postfix
	 * @param {string?} spliter
	 * @returns {string}
	 */
	postfixFile(name, postfix, spliter = '-') {
		return `${path.dirname(name)}${path.sep}${obj.noextname(name)}${spliter}${postfix}${path.extname(name)}`;
	},
};
module.exports = obj;

const path = require('path');
