import sharp from 'sharp';
import * as fsp from 'fs/promises';
import path from 'path';
import { postfixFile } from './util';

export async function background(buffer: Buffer) {
	return await sharp(buffer)
		.flatten({	background: '#0f0' })
		.toBuffer();
}

export async function apply(fileName: string, postfix: string, operater: (buffer: Buffer) => Promise<Buffer>) {
	await fsp.writeFile(postfixFile(fileName, postfix), await operater(await fsp.readFile(fileName)));
}

export async function extend(buffer: Buffer) {
	const border = 8;
	return await sharp(buffer)
		.extend({
			top: border,
			bottom: border,
			left: border,
			right: border,
			background: { alpha: 0, r: 0, g: 0, b: 0 },
		})
		.toBuffer();
}

// apply('packages/weapp/src/asserts/calendar.png', 'small', extend);
// apply('packages/weapp/src/asserts/house.png', 'small', extend);
