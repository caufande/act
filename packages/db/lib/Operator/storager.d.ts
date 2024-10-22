/**
 * 缓存器定义
 * @license GPL-2.0-or-later
 */
declare module './storager';
export type Asserter<T> = (n: unknown) => asserts n is T;
export type Deserializer<T> = (n: any) => T;
export type StoragerIniter = new <T>(asserter: Asserter<T>, deserializer?: Deserializer<T>) => Storager<T>;
export declare abstract class Storager<T> {
    protected readonly assert: Asserter<T>;
    protected readonly deserializer: Deserializer<T>;
    constructor(assert: Asserter<T>, deserializer?: Deserializer<T>);
    abstract clear(): Promise<void>;
    abstract delete(key: string): Promise<void>;
    protected abstract getOrigin(key: string): Promise<unknown>;
    get(key: string): Promise<T | null>;
    abstract set(key: string, value: T): Promise<boolean>;
    protected abstract batchGetOrigin(keys: readonly string[]): Promise<unknown>;
    batchGet(keys: readonly string[]): Promise<(T | null)[]>;
    abstract batchSet(kvs: Map<string, T>): Promise<boolean>;
}
