export var Lang;
(function (Lang) {
    Lang[Lang["zh"] = 0] = "zh";
    Lang[Lang["zh-CN"] = 0] = "zh-CN";
    Lang[Lang["en"] = 1] = "en";
    Lang[Lang["en-US"] = 1] = "en-US";
})(Lang || (Lang = {}));
export function l10n(langMap, langCode) {
    if (langCode === '*')
        return langMap[langMap['*']];
    return langMap[langCode] ?? langMap[langMap['*']];
}
