/**
 * 活动类测试
 * @license AGPL-3.0-or-later
 */
declare module './Act.test';

import { gtc, m, ta } from '@cauact/test-helper';
import { Value } from '@sinclair/typebox/value';
import test from 'tape';
import type { Comment } from '../CnbApi';
import Act, { ActParsed, Detail, Stage } from './Act';
import { Operation } from './groupExpr';

const cs = gtc(n => Value.Check(Stage, n));
ta('活动阶段类型守卫', [
	cs('空', {
		name: '',
		timeSteps: [],
		details: [],
	}, true),
	cs('普通', {
		name: 'sdkjs',
		timeSteps: [[new Date(18937), new Date(98347)]],
		details: ['sdkjsd'],
	}, true),
	cs('大', {
		name: 'akjdkjaslkwejjsdk',
		timeSteps: [
			[new Date(219832), new Date(3298782)],
			[new Date(223819832), new Date(38782)],
		],
		details: [
			'sdjsjhdj',
			'sdku',
			'igfi',
		],
	}, true),
	cs('少字段', {
		name: 'asda',
		details: ['asd'],
	}, false),
	cs('缺时间', {
		name: 'asda',
		timeSteps: [
			[new Date(92873)],
		],
		details: [],
	}, false),
	cs('描述类型不对', {
		name: '982',
		timeSteps: [],
		details: [
			'2782n',
			21321,
			'asdjks',
		],
	}, false),
]);

const cd = gtc(n => Value.Check(Detail, n));
ta('详细信息类型守卫', [
	cd('空', {
		title: '',
		strings: [],
		details: [],
	}, true),
	cd('普通', {
		title: 'asye8',
		strings: ['sdiayse', 'dfu2'],
		details: [
			{
				title: '',
				strings: [],
				details: [],
			},
		],
	}, true),
	cd('大', {
		title: 'asuiduyqk',
		strings: ['asdouh2ka', 'sdkljq278', 'asjklj27'],
		details: [
			{
				title: '1298bf',
				strings: ['sadkj23iu', 'fdlkq234y83'],
				details: [
					{
						title: 'asdlkj12io',
						strings: ['asdku2ui'],
						details: [],
					},
				],
			},
		],
	}, true),
	cd('缺字段', {
		title: 'asjklda',
		strings: [],
	}, false),
	cd('字类型不对', {
		title: 'asjd',
		strings: [129213, 98213463],
		details: [],
	}, false),
	cd('包含的详细信息缺字段', {
		title: '8923',
		strings: ['21hewuysa'],
		details: [
			{
				title: 'ai23',
				strings: ['1iu3y'],
			},
		],
	}, false),
	cd('包含的详细信息的详细信息的类型错误', {
		title: '1371s',
		strings: ['12831a'],
		details: [
			{
				title: 'iu1sa',
				strings: ['asukh213i'],
				details: [
					1321,
				],
			},
		],
	}, false),
]);

const cad = gtc(n => Value.Check(ActParsed, n));
ta('解析后项目的类型守卫', [
	cad('空', {
		title: '',
		detail: {
			title: '',
			strings: [],
			details: [],
		},
		groupExpr: '',
		stages: [],
	}, true),
	cad('缺字段', {
		title: '',
		detail: {
			title: '',
			strings: [],
			details: [],
		},
		groupExpr: '',
	}, false),
]);

const ca = gtc(n => Value.Check(Act.tSchema, n));
ta('项目的类型守卫', [
	ca('空', {
		title: '',
		detail: {
			title: '',
			strings: [],
			details: [],
		},
		groupExpr: '',
		stages: [],
		floor: 0,
		id: 0,
		author: '',
		authorUrl: '',
	}, true),
	ca('缺字段', {
		title: '',
		detail: {
			title: '',
			strings: [],
			details: [],
		},
		groupExpr: '',
		stages: [],
		floor: 0,
		id: 0,
		author: '',
	}, false),
	t => {
		t.throws(() => {
			Act.assert({});
		}, '类型守卫');
	},
]);

test('项目反序列化器', t => {
	const a: Act = {
		title: '',
		detail: {
			title: '',
			strings: [],
			details: [],
		},
		groupExpr: '',
		stages: [],
		floor: 0,
		id: 0,
		author: '',
		authorUrl: '',
	};
	// @ts-ignore
	a.stages.push({ name: 'asd', timeSteps: [[Date(), Date()]], details: [] });

	t.throws(() => {
		Act.assert(a);
	}, '没反序列化会报错');

	const n = Act.deserializer(a);
	t.doesNotThrow(() => {
		Act.assert(n);
	}, '反序列化成功');
	t.doesNotThrow(() => {
		Act.assert(a);
	}, '会改变原数据');

	t.end();
});

// @ts-ignore
const cp = gtc(Act.isParserError);
ta('编译错误类型守卫', [
	cp('是编译错误', {
		format(_) { return 'asd'; },
	}, true),
	cp('缺字段', {
	}, false),
	cp('不是函数', {
		format: 123,
	}, false),
]);

test('解析实战', t => {
	const comment = {
		id: 5316890,
		body: m(
			'<h1 id="正大杯第十五届全国大学生市场调查与分析大赛在华留学生组">“正大杯”第十五届全国大学生市场调查与分析大赛在华留学生组</h1>',
			'<h2 id="面向群体">面向群体</h2>',
			'<p>在华留学生<br>',
			'在校 &amp; 本科生<br>',
			'在校 &amp; 研究生</p>',
			'<h2 id="时间安排">时间安排</h2>',
			'<h3 id="报名">报名</h3>',
			'<p>2024/10/9 到 2024/11/12</p>',
			'',
		),
		author: '肉丁土豆表',
		authorUrl: 'https://home.cnblogs.com/u/2611309/',
		faceUrl: 'https://pic.cnblogs.com/face/2611309/20211031003846.png',
		floor: 4,
		dateAdded: new Date('2024-10-24T19:53:13.593'),
	} satisfies Comment;
	const parsed = {
		title: '“正大杯”第十五届全国大学生市场调查与分析大赛在华留学生组',
		detail: {
			title: '“正大杯”第十五届全国大学生市场调查与分析大赛在华留学生组',
			strings: [],
			details: [],
		},
		groupExpr: [
			Operation.Or,
			[Operation.And, '研究生', '在校'],
			[
				Operation.Or,
				[Operation.And, '本科生', '在校'],
				'在华留学生',
			],
		],
		stages: [
			{
				name: '报名',
				timeSteps: [
					[
						new Date('2024-12-08T16:00:00.000Z'),
						new Date('2025-01-11T16:00:00.000Z'),
					],
				],
				details: [],
			},
		],
		floor: 4,
		id: 5316890,
		author: '肉丁土豆表',
		authorUrl: 'https://home.cnblogs.com/u/2611309/',
	} satisfies Act;

	t.doesNotThrow(() => {
		t.deepEqual(new Act(comment), parsed, '解析结果相同');
	}, '且不报错');

	t.throws(() => {
		comment.body = comment.body.slice(2);
		new Act(comment);
	}, '错误案例');

	t.throws(() => {
		// @ts-ignore
		comment.body = Error();
		new Act(comment);
	}, '其他错误');

	t.end();
});

