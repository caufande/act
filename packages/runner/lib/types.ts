/**
 * 类型导出模块
 * @license AGPL-3.0-or-later
 */
declare module './types';

export type EmojiOperation = (buffer: Buffer) => Promise<Buffer>;
