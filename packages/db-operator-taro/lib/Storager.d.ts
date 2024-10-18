/**
 * 缓存器定义
 * @license GPL-2.0-or-later
 */
declare module './Storager';
import { Storager as IStorager } from '@cauact/db/lib/Operator';
export default class Storager<T> extends IStorager<T> {
    batchGet(keys: readonly string[]): Promise<(T | null)[]>;
    get(key: string): Promise<T | null>;
    set(key: string, value: T): Promise<boolean>;
    batchSet(kvs: Map<string, T>): Promise<boolean>;
    clear(): Promise<void>;
    delete(key: string): Promise<void>;
}
