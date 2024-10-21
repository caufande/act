import sharp from 'sharp';
import * as fsp from 'fs/promises';

const buf = await sharp('packages/runner/house.png')
	.flatten({	background: '#0f0' })
	.toBuffer();
fsp.writeFile('packages/runner/test.png', buf);

