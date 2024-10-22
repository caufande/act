import { Type } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import { getText, parseDate } from './parseDate';
export const Stage = Type.Object({
    name: Type.String({ default: '' }),
    timeStep: Type.Array(Type.Tuple([Type.Date(), Type.Date()]), { default: [] }),
    detail: Type.Array(Type.String(), { default: [] }),
});
/**
 * 项目具体数据
 */
export default class Act {
    static assertDetail(n) {
        const Detail = Type.Object({
            title: Type.String(),
            contentString: Type.String(),
            contentDetails: Type.Any(),
        });
        Detail.properties.contentDetails = Type.Array(Detail);
        Value.Assert(Detail, n);
    }
    static assert(n) {
        Value.Assert(Type.Object({
            floor: Type.Number(),
            id: Type.Number(),
            title: Type.String(),
            author: Type.String(),
            authorUrl: Type.String(),
            detail: Type.Any(),
            stages: Type.Array(Stage),
        }), n);
        // Act.assertDetail(n.detail);
    }
    static deserializer(n) {
        const a = n;
        a.stages.forEach(n => n.timeStep = n.timeStep.map(([a, b]) => [new Date(a), new Date(b)]));
        return n;
    }
    /**
     * 项目编号
     */
    floor;
    id;
    /**
     * 项目名称
     */
    title;
    author;
    authorUrl;
    /**
     * 项目介绍
     */
    detail = {};
    /**
     * 活动具体内容
     *
     * @minItems 1
     */
    stages = [Value.Create(Stage)];
    parsingStage = false;
    constructor({ floor, id, author, authorUrl }, json) {
        this.floor = floor;
        this.id = id;
        this.author = author;
        this.authorUrl = authorUrl;
        const titles = [];
        for (const ele of json.content) {
            switch (ele.type) {
                case 'h1':
                    titles.push(getText(ele));
                    continue;
                case 'h2':
                    this.parsingStage = this.parsingStage || getText(ele).includes('时间安排');
                    break;
            }
            // this.parsingStage ? this.parseStage(ele) : this.parseDetail(ele);
            if (this.parsingStage)
                this.parseStage(ele);
        }
        this.title = titles.join(' ');
    }
    stageNow = this.stages[0];
    parseStage(ele) {
        switch (ele.type) {
            case 'h2': break;
            case 'h3':
                this.stages.push(this.stageNow = Value.Create(Stage));
                this.stageNow.name = getText(ele);
                break;
            case 'p':
                if (this.stageNow.timeStep?.length !== 0)
                    this.stageNow.detail.push(getText(ele));
                else {
                    const dateRange = parseDate(getText(ele), this.floor);
                    this.stageNow.timeStep = this.stageNow.timeStep?.concat(dateRange);
                }
                break;
        }
    }
}
