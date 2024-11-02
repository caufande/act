/**
 * 用户组表达式相关
 * @license AGPL-3.0-or-later
 */
declare module './groupExpr';

import { Value } from '@sinclair/typebox/value';
import test from 'tape';
import getGroupExpr, { assertGroupExpr, GroupExpr, Operation } from '../../lib/parseComment/groupExpr';

function cer<T>(i: string, e: GroupExpr | T, b: boolean) {
	return (t: test.Test) => {
		t[b ? 'ok' : 'notok'](Value.Check(GroupExpr, e), i);
	};
}

function ta(n: string, c: ((t: test.Test) => void)[]) {
	test(n, t => {
		c.forEach(f => f(t));
		t.end();
	});
}

ta('类型守卫', [
	cer('单个组', 'aa', true),
	cer('非', [Operation.Not, 'bb'], true),
	/**@todo 一元运算符只能有非 */
	// cer('一定是非', [Operation.And, 'cc'], false),
	// cer('一定是非', [Operation.Or, 'dd'], false),
	cer('和', [Operation.And, 'ee', 'ff'], true),
	cer('或', [Operation.Or, 'gg', 'hh'], true),
	/**@todo 二元运算符不能是非 */
	// cer('二元非非', [Operation.Not, 'ii', 'jj'], false),
	cer('嵌套', [
		Operation.And,
		[Operation.Not, 'kk'],
		[Operation.Or, [Operation.Not, 'll'], 'mm'],
	], true),
]);

test('类型断言器', t => {
	t.throws(() => {
		assertGroupExpr([-1, 'nn', 'oo']);
	}, '守卫住了');
	t.doesNotThrow(() => {
		assertGroupExpr([Operation.And, 'pp', 'qq']);
	}, '通过守卫');
	t.end();
});

test('表达式解析', t => {
	t.deepEqual(
		getGroupExpr('rr &ss&tt&uu & vv'),
		[
			Operation.And, 'vv', [
				Operation.And, 'uu', [
					Operation.And, 'tt', [
						Operation.And, 'ss', 'rr',
					],
				],
			],
		] satisfies GroupExpr,
		'连与',
	);

	t.deepEqual(
		getGroupExpr('ww |xx|yy|zz | aaa'),
		[
			Operation.Or, 'aaa', [
				Operation.Or, 'zz', [
					Operation.Or, 'yy', [
						Operation.Or, 'xx', 'ww',
					],
				],
			],
		] satisfies GroupExpr,
		'连或',
	);

	t.deepEqual(
		getGroupExpr('!!  !bbb'),
		[Operation.Not, [Operation.Not, [Operation.Not, 'bbb']]] satisfies GroupExpr,
		'连与',
	);

	t.deepEqual(
		getGroupExpr(['ccc ', '( !ddd & eee) ', '(!fff&ggg&!!hhh)']),
		[
			Operation.Or,
			[
				Operation.And,
				[Operation.Not, [Operation.Not, 'hhh']],
				[
					Operation.And,
					'ggg',
					[Operation.Not, 'fff'],
				],
			],
			[
				Operation.Or,
				[
					Operation.And,
					'eee',
					[Operation.Not, 'ddd'],
				],
				'ccc',
			],
		] satisfies GroupExpr,
		'扁平嵌套',
	);

	t.throws(() => {
		getGroupExpr('asd&');
	}, '错误表达式');

	t.end();
});
