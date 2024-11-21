/**
 * 活动类定义
 * @license AGPL-3.0-or-later
 */
declare module './Act';
import { Static } from '@sinclair/typebox';
import { Comment } from '../CnbApi';
import { GroupExpr } from './groupExpr';
export interface Stage {
    /**
     * 内容名称
     */
    readonly name: string;
    /**
     * 活动时间
     *
     * 例如 2024 年 9 月 1 日到 2024 年 9 月 10 日，中间扣掉 9 月 3 日，即表示为
     * [[2024, 9, 1], [2024, 9, 2], [2024, 9, 4], [2024, 9, 10]]
     *
     * @minItems 1
     */
    readonly timeSteps: readonly (readonly [Date, Date])[];
    /**
     * 活动的描述
     */
    readonly details: readonly string[];
    readonly partition: GroupExpr | null;
}
export declare const Stage: import("@sinclair/typebox").TObject<{
    name: import("@sinclair/typebox").TString;
    timeSteps: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TTuple<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TDate]>>;
    details: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
    partition: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNull, import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TAny, import("@sinclair/typebox").TAny]>]>;
}>;
export interface Detail {
    readonly title: string;
    readonly strings: readonly string[];
    readonly details: readonly Detail[];
}
export declare const Detail: import("@sinclair/typebox").TObject<{
    title: import("@sinclair/typebox").TString;
    strings: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
    details: import("@sinclair/typebox").TAny;
}>;
export interface ActParsed {
    readonly title: string;
    readonly detail: Detail;
    readonly groupExpr: GroupExpr;
    readonly stages: readonly Stage[];
}
export declare const ActParsed: import("@sinclair/typebox").TObject<{
    title: import("@sinclair/typebox").TString;
    detail: import("@sinclair/typebox").TObject<{
        title: import("@sinclair/typebox").TString;
        strings: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
        details: import("@sinclair/typebox").TAny;
    }>;
    groupExpr: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TAny, import("@sinclair/typebox").TAny]>;
    stages: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        name: import("@sinclair/typebox").TString;
        timeSteps: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TTuple<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TDate]>>;
        details: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
        partition: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNull, import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TAny, import("@sinclair/typebox").TAny]>]>;
    }>>;
}>;
/**
 * 项目具体数据
 */
export default class Act implements ActParsed {
    static tSchema: import("@sinclair/typebox").TObject<{
        title: import("@sinclair/typebox").TString;
        detail: import("@sinclair/typebox").TObject<{
            title: import("@sinclair/typebox").TString;
            strings: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
            details: import("@sinclair/typebox").TAny;
        }>;
        groupExpr: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TAny, import("@sinclair/typebox").TAny]>;
        stages: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            name: import("@sinclair/typebox").TString;
            timeSteps: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TTuple<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TDate]>>;
            details: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
            partition: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNull, import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TAny, import("@sinclair/typebox").TAny]>]>;
        }>>;
        floor: import("@sinclair/typebox").TNumber;
        id: import("@sinclair/typebox").TNumber;
        author: import("@sinclair/typebox").TString;
        authorUrl: import("@sinclair/typebox").TString;
    }>;
    static _: {
        floor: number;
        title: string;
        detail: {
            details: any;
            title: string;
            strings: string[];
        };
        groupExpr: any;
        stages: {
            name: string;
            timeSteps: [Date, Date][];
            details: string[];
            partition: any;
        }[];
        id: number;
        author: string;
        authorUrl: string;
    };
    static assert(n: unknown): asserts n is Act;
    static deserializer(n: any): Act;
    protected static ParserError: import("@sinclair/typebox").TObject<{
        format: import("@sinclair/typebox").TFunction<[import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            source: import("@sinclair/typebox").TString;
            text: import("@sinclair/typebox").TString;
        }>>], import("@sinclair/typebox").TString>;
    }>;
    protected static isParserError(n: unknown): n is Static<typeof Act.ParserError>;
    readonly title: string;
    readonly detail: Detail;
    /**
     * 活动具体内容
     *
     * @minItems 1
     */
    readonly stages: readonly Stage[];
    readonly groupExpr: GroupExpr;
    readonly floor: number;
    readonly id: number;
    readonly author: string;
    readonly authorUrl: string;
    constructor({ floor, id, author, authorUrl, body }: Comment);
}
