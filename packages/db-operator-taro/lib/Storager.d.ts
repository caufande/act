/**
 * 缓存器定义
 * @license AGPL-3.0-or-later
 */
declare module './Storager';
import { Storager as IStorager } from '@cauact/db';
export default class Storager<T> extends IStorager<T> {
    protected batchGetOrigin(keys: readonly string[]): Promise<unknown>;
    protected getOrigin(key: string): Promise<T | null>;
    setOrigin(key: string, value: T): Promise<boolean>;
    batchSetOrigin(kvs: Map<string, T>): Promise<boolean>;
    clear(): Promise<void>;
    delete(key: string): Promise<void>;
}
