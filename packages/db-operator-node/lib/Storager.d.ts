/**
 * 缓存器定义
 * @license GPL-2.0-or-later
 */
declare module './Storager';
import { Storager as IStorager } from '@cauact/db';
export default class Storager<T> extends IStorager<T> {
    protected batchGetOrigin(keys: readonly string[]): Promise<unknown>;
    protected getOrigin(key: string): Promise<unknown>;
    set(key: string, value: T): Promise<boolean>;
    batchSet(kvs: Map<string, T>): Promise<boolean>;
    clear(): Promise<void>;
    delete(key: string): Promise<void>;
}
