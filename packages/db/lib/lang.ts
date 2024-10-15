/**
 * 语言相关
 * @license GPL-2.0-or-later
 */
declare module './lang';

export enum Lang {
	zh,
	'zh-CN' = Lang.zh,
	en,
	'en-US' = Lang.en,
}

export type LangMap = Partial<Record<Lang, string>> & { '*': Lang };
