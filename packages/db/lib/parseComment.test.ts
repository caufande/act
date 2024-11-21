/**
 * 自然评论解析器相关测试
 * @license AGPL-3.0-or-later
 */
declare module './parseComment.test';

import { m } from '@cauact/test-helper';
import test from 'tape';
import parseComment, { Act } from './parseComment';
import { Comment } from './CnbApi';
import { Operation } from './parseComment/groupExpr';

export * from './parseComment/Act.test';
export * from './parseComment/groupExpr.test';
export * from './parseComment/parseDate.test';

test('测试一下导出函数', t => {
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
			'<h3>[hh &amp; kk]eiqo</h3>',
			'<p>2024/10/2  2024/11/2</p>',
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
				timeSteps: [[new Date(2024, 9, 9), new Date(2024, 10, 12)]],
				details: [],
				partition: null,
			},
			{
				name: 'eiqo',
				timeSteps: [[new Date(2024, 9, 2), new Date(2024, 10, 2)]],
				details: [],
				partition: [Operation.And, 'kk', 'hh'],
			},
		],
		floor: 561,
		id: 293,
		author: 'oqj',
		authorUrl: 'pqjs',
	} satisfies Act;

	t.deepEqual(
		parseComment(comment),
		parsed,
		'结果一样',
	);

	t.throws(() => {
		comment.authorUrl = 123 as any;
		parseComment(comment, { check: true });
	}, '类型检查');

	t.end();
});
