/**
 * 缓存器定义
 * @license AGPL-3.0-or-later
 */
declare module './storager';
export type StoragerIniter = new <T>(option?: StoragerOption<T>) => Storager<T>;
export declare enum CheckingType {
    Both = 0,
    Save = 1,
    Load = 2,
    None = 3
}
export type Asserter<T> = (n: unknown) => asserts n is T;
export type Serializer<T> = (n: T) => any;
export type Deserializer<T> = (n: any) => T;
export interface StoragerOption<T> {
    checkingType?: CheckingType;
    asserter?: Asserter<T>;
    serializer?: Serializer<T>;
    deserializer?: Deserializer<T>;
}
export declare abstract class Storager<T> {
    private readonly asserter?;
    protected assert(n: unknown): asserts n is T;
    checkingType: CheckingType;
    protected readonly serializer?: Serializer<T>;
    protected readonly deserializer?: Deserializer<T>;
    constructor({ checkingType, asserter, serializer, deserializer, }?: StoragerOption<T>);
    private isSetCheck;
    private isGetCheck;
    abstract clear(): Promise<void>;
    abstract delete(key: string): Promise<void>;
    protected abstract getOrigin(key: string): Promise<unknown>;
    get(key: string): Promise<T | null>;
    protected abstract setOrigin(key: string, value: T): Promise<boolean>;
    set(key: string, value: T): Promise<boolean>;
    protected abstract batchGetOrigin(keys: readonly string[]): Promise<unknown>;
    batchGet(keys: readonly string[]): Promise<(T | null)[]>;
    protected abstract batchSetOrigin(kvs: Map<string, T>): Promise<boolean>;
    batchSet(kvs: ReadonlyMap<string, T>): Promise<boolean>;
}
