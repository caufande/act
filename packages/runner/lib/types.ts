/**
 * 类型导出模块
 * @license GPL-2.0-or-later
 */
declare module './types';

export type EmojiOperation = (buffer: Buffer) => Promise<Buffer>;
