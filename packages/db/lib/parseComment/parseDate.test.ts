/**
 * 日期解析测试
 * @license AGPL-3.0-or-later
 */
declare module './parseDate.test';

import { ta } from '@cauact/test-helper';
import test from 'tape';
import { textToDate } from '../util';
import { parseDate } from './parseDate';

let floor = 39;
function c(i: string, n: string, s: [string, string] | null = null) {
	return (t: test.Test) => {
		t.deepEqual(
			parseDate(n, floor++),
			s ? [s.map(textToDate)] : [],
			i,
		);
	};
}

ta('日期解析测试', [
	c(
		'一天',
		'2024/10/24',
		['2024/10/24', '2024/10/24'],
	),
	c(
		'一天前字',
		'skalsd 2024/7/24',
		['2024/7/24', '2024/7/24'],
	),
	c(
		'一天后字',
		'2024/10/10 ohwiq',
		['2024/10/10', '2024/10/10'],
	),
	c(
		'时间段',
		'2022/12/3 2024/8/30',
		['2022/12/3', '2024/8/30'],
	),
	c(
		'时间段隔字',
		'2025/9/18 doskwhjd 2027/8/29',
		['2025/9/18', '2027/8/29'],
	),
	c(
		'时间段前字',
		'soiao 2025/9/31 doskwhjd 2027/8/5',
		['2025/9/31', '2027/8/5'],
	),
	c(
		'时间段后字',
		'2025/2/18 doskwhjd 2027/4/13 osjdj',
		['2025/2/18', '2027/4/13'],
	),
	c(
		'null',
		'ajkduhsa',
	),
	c(
		'错误月份',
		'2025/13/24',
	),
	c(
		'错误日期',
		'2025/12/32',
	),
	c(
		'错误年份',
		'202/12/22',
	),
	t => {
		t.throws(() => {
			parseDate('2024/10/27 2023/9/9 2029/4/3', floor++);
		}, '解析失败');
	},
]);
