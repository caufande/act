/**
 * 网络拉取器
 * @license GPL-2.0-or-later
 */
declare module './Puller';
import CnbApi, { CnbConfig } from './CnbApi';
import { Storager } from './Operator';
import type { Schema as IAct } from './schema';
export type Version = readonly number[];
type Act = IAct;
export default class Puller {
    readonly postId: number;
    readonly blogApp: string;
    protected readonly cnbApi: CnbApi;
    protected readonly storagerVersion: Storager<Version>;
    protected readonly storagerAct: Storager<Act>;
    constructor(cnbConfig: CnbConfig, postId: number, blogApp: string);
    getVersion(): Promise<number[]>;
    getDiff(versionNow: Version): Promise<Set<number>>;
}
export {};
