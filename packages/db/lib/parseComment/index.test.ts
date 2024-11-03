/**
 * 自然评论解析器相关测试
 * @license AGPL-3.0-or-later
 */
declare module './index.test';

import { m } from '@cauact/test-helper';
import test from 'tape';
import parseComment, { Act } from '.';
import { Comment } from '../CnbApi';
import { Operation } from './groupExpr';

export * from './Act.test';
export * from './groupExpr.test';
export * from './parseDate.test';

test('测试一下导出函数', async t => {
	const comment = {
		id: 293,
		body: m(
			'<h1>ASD</h1>',
			'<h2>面向群体</h2>',
			'<p>qiw<br>',
			'ow &amp; ls</p>',
			'<h2>时间安排</h2>',
			'<h3>pqwj</h3>',
			'<p>2024/10/9  2024/11/12</p>',
		),
		author: 'oqj',
		authorUrl: 'pqjs',
		faceUrl: 'akjq',
		floor: 561,
		dateAdded: new Date('2024-10-24T19:53:13.593'),
	} satisfies Comment;
	const parsed = {
		title: 'ASD',
		detail: {
			title: 'ASD',
			strings: [],
			details: [],
		},
		groupExpr: [
			Operation.Or,
			[Operation.And, 'ls', 'ow'],
			'qiw',
		],
		stages: [
			{
				name: 'pqwj',
				timeSteps: [
					[
						new Date('2024-12-08T16:00:00.000Z'),
						new Date('2025-01-11T16:00:00.000Z'),
					],
				],
				details: [],
			},
		],
		floor: 561,
		id: 293,
		author: 'oqj',
		authorUrl: 'pqjs',
	} satisfies Act;

	t.deepEqual(
		await parseComment(comment),
		parsed,
		'结果一样',
	);

	t.end();
});
