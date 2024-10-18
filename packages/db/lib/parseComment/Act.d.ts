/**
 * 活动类定义
 * @license GPL-2.0-or-later
 */
declare module './Act';
import { JSONContent } from 'html-to-json-parser/dist/types';
import { Comment } from '../CnbApi';
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
    readonly timeStep: readonly (readonly [Date, Date])[];
    /**
     * 活动的描述
     */
    readonly detail: readonly string[];
}
export interface Detail {
    readonly title: string;
    readonly contentString: string;
    readonly contentDetails: readonly Detail[];
}
/**
 * 项目具体数据
 */
export declare class Act {
    /**
     * 项目编号
     */
    readonly floor: number;
    /**
     * 项目名称
     */
    readonly title: string;
    readonly author: string;
    readonly authorUrl: string;
    /**
     * 项目介绍
     */
    readonly detail: Detail;
    /**
     * 活动具体内容
     *
     * @minItems 1
     */
    readonly stages: readonly Stage[];
    protected parsingStage: boolean;
    constructor({ floor, author, authorUrl }: Comment, json: JSONContent);
    private stageNow;
    protected parseStage(ele: JSONContent): void;
}
