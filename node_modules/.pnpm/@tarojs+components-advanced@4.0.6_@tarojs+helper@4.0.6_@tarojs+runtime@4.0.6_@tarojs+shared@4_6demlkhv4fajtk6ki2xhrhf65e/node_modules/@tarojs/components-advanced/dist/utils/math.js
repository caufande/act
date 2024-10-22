function getMiddleNumber(...list) {
    return list.sort((a, b) => a - b)[Math.floor(list.length / 2)];
}
function isCosDistributing(list, datum = 0) {
    let flags = 0;
    for (let i = 0; i < list.length - 1; i++) {
        if (getMiddleNumber(list[i], datum, list[i + 1]) === datum) {
            flags++;
        }
    }
    return flags === list.length - 1;
}

export { getMiddleNumber, isCosDistributing };
//# sourceMappingURL=math.js.map
