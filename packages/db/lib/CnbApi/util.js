export function calcWhichPage(floor, total, pageSize) {
    const over = total % pageSize;
    const pageIndex = (total - over) / pageSize - Math.ceil((floor - over) / pageSize) + 1;
    const eleIndex = pageSize - (floor - 1 - over + pageSize) % pageSize - 1;
    return { pageIndex, eleIndex };
}
export function calcPageNum(total, pageSize) {
    return Math.ceil(total / pageSize);
}
