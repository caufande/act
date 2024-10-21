/**
 * 网络拉取器
 * @license GPL-2.0-or-later
 */
declare module './Puller';
import CnbApi, { CnbConfig, CommentGetter } from './CnbApi';
import { Storager } from './Operator';
import { Act } from './parseComment';
export declare const Version: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TNumber>;
export type Version = readonly number[];
export type Diff = Set<number>;
export declare const VerInfo: import("@sinclair/typebox").TObject<{
    version: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TNumber>;
    diff: import("@sinclair/typebox").TUnknown;
}>;
export interface VerInfo {
    readonly version: Version;
    readonly diff: Diff;
}
export interface Pulled {
    readonly verInfo: VerInfo;
    readonly acts: readonly Act[];
}
export default class Puller {
    readonly postId: number;
    protected static verStartStr: string;
    protected static verEndStr: string;
    protected static keySign: string;
    protected static getKey(floor: number): string;
    protected static versionKey: string;
    protected readonly cnbApi: CnbApi;
    protected readonly commentGetter: CommentGetter;
    protected readonly storagerVersion: Storager<Version>;
    protected readonly storagerAct: Storager<Act>;
    constructor(cnbConfig: CnbConfig, postId: number);
    protected getStoragedAct(floor: number): Promise<Act | null>;
    protected setStoragedAct(floor: number, act: Act): Promise<boolean>;
    protected getStoragedVersion(): Promise<Version | null>;
    protected setStoragedVersion(version: Version): Promise<boolean>;
    private cachedVerInfo;
    private getDiff;
    private reqVerInfo;
    update(): Promise<VerInfo>;
    private getStoragedVerInfo;
    protected getVerInfo(): Promise<VerInfo>;
    protected cachedAct: Act[];
    protected reqAct(floor: number): Promise<Act>;
    getAct(floor: number): Promise<Act>;
    upgradeAll(): Promise<void>;
    protected getActAll(): Promise<Act[]>;
    getAll(): Promise<Pulled>;
}
