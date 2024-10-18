import { JSONContent } from 'html-to-json-parser/dist/types';
import { throwError } from '../errors';
import { textToDate } from '../util';

/**
 * 解析时间
 * @license GPL-2.0-or-later
 */
declare module './parseDate';


export function getText(json: JSONContent): string {
	switch (json.type) {
		case 'p':
			return json.content.map(n => (typeof n === 'string' ? n : getText(n))).join('');
		case 'h1':
		case 'h2':
		case 'h3':
		case 'h4':
		case 'h5':
			return json.content.join('');
		case 'br':
			return '\n';
		default:
			return json.toString();
	}
}

export type Parsed = [Date, Date][];
function parseDateLine(line: string, floor: number): [Date, Date] | null {
	const texts = line.match(/((?<=\s)|^)[1-9]\d{3,}\/([1-9]|1[0-2])\/([1-2]\d|30|31|[1-9])((?=\s)|$)/g) ?? [];
	const dates = texts.map(textToDate);
	if (dates.length === 0) return null;
	if (dates.length === 1) return [dates[0], dates[0]];
	if (dates.length === 2) return dates as [Date, Date];
	throwError('TooManyDatesInACommentLine', { line, floor });
}
export function parseDate(content: string, floor: number) {
	const dateRange: [Date, Date][] = [];
	for (const line of content.split('\n')) {
		const dates = parseDateLine(line, floor);
		if (dates === null) continue;
		dateRange.push(dates);
	}
	return dateRange;
}
