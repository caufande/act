export function range(from, to) {
    return Array(to - from).fill(from)
        .map((a, b) => a + b);
}
export function lowerFirst(str) {
    return str.charAt(0).toLowerCase() + str.slice(1);
}
export function removeBlankBetweenAttr(str) {
    return str.replace(/(?<=>)\s+(?=<)/g, '');
}
export function textToDate(text) {
    const arr = text.split('/').map(n => parseInt(n));
    arr[1]++;
    return new Date(...arr);
}
