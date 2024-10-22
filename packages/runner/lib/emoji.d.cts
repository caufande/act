import type { EmojiOperation } from './types';
/**
 * @param {string} fileName
 * @param {string} postfix
 * @param {readonly EmojiOperation[]} operations
 */
export function apply(fileName: string, postfix: string, operations: readonly EmojiOperation[]): Promise<void>;
export function background(buffer: Buffer): Promise<Buffer>;
export let smallSize: number;
export function resize(buffer: Buffer): Promise<Buffer>;
export let ratio: number;
export function extend(buffer: Buffer): Promise<Buffer>;
