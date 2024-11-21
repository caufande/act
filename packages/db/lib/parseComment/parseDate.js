import { throwError } from '../errors';
import { textToDate } from '../util';
function parseDateLine(line, floor) {
    const texts = line.match(/((?<=\s)|^)[1-9]\d{3,}\/([1-9]|1[0-2])\/([1-2]\d|30|31|[1-9])((?=\s)|$)/g) ?? [];
    const dates = texts.map(textToDate);
    if (dates.length === 0)
        return null;
    if (dates.length === 1)
        return [dates[0], dates[0]];
    if (dates.length === 2)
        return dates;
    throwError('TooManyDatesInACommentLine', { line, floor });
}
export function parseDate(content, floor) {
    const dateRange = [];
    for (const line of content.split('\n')) {
        const dates = parseDateLine(line, floor);
        if (dates === null)
            continue;
        dateRange.push(dates);
    }
    return dateRange;
}
