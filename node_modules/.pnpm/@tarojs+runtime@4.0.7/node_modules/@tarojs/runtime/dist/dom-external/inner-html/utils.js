function unquote(str) {
    const car = str.charAt(0);
    const end = str.length - 1;
    const isQuoteStart = car === '"' || car === "'";
    if (isQuoteStart && car === str.charAt(end)) {
        return str.slice(1, end);
    }
    return str;
}

export { unquote };
//# sourceMappingURL=utils.js.map
