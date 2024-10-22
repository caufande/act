/**
 * Emoji 处理相关
 * @license GPL-2.0-or-later
 */
const obj = {
	/**
	 * @param {string} fileName
	 * @param {string} postfix
	 * @param {readonly EmojiOperation[]} operations
	 */
	async apply(fileName, postfix, operations) {
		let buffer = await fsp.readFile(fileName);
		for (const operation of operations) buffer = await operation(buffer);
		await fsp.writeFile(postfixFile(fileName, postfix), buffer);
	},

	/**@type {EmojiOperation} */
	async background(buffer) {
		return await sharp(buffer)
			.flatten({	background: '#0f0' })
			.toBuffer();
	},

	smallSize: 63,
	/**@type {EmojiOperation} */
	async resize(buffer) {
		return await sharp(buffer)
			.resize(obj.smallSize, obj.smallSize)
			.toBuffer();
	},

	ratio: 0.7,
	/**@type {EmojiOperation} */
	async extend(buffer) {
		const metadata = await sharp(buffer)
			.metadata();
		const width = metadata.width ?? 64;
		const border = Math.round(((width / obj.ratio) - width) / 2);
		return await sharp(buffer)
			.extend({
				top: border,
				bottom: border,
				left: border,
				right: border,
				background: { alpha: 0, r: 0, g: 0, b: 0 },
			})
			.toBuffer();
	},
};
module.exports = obj;

const sharp = require('sharp');
const fsp = require('fs/promises');
const { postfixFile } = require('./util.cjs');
/**@import { EmojiOperation } from './types' */
