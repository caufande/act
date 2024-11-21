/** 将距离值根据单位转换为 Number 类型
 * TODO: 未来可以考虑支持更多单位
 */
function convertPX2Int(distance) {
    if (typeof distance === 'string') {
        const str = distance.toLowerCase();
        if (/px$/.test(str)) {
            return Number(str.replace(/px$/, ''));
        }
    }
    return distance;
}
function convertNumber2PX(styleValue) {
    if (!styleValue && styleValue !== 0)
        return '';
    return typeof styleValue === 'number' ? styleValue + 'px' : styleValue;
}

export { convertNumber2PX, convertPX2Int };
//# sourceMappingURL=convert.js.map
