import { getText, parseDate } from './parseDate';
/**
 * 项目具体数据
 */
export class Act {
    /**
     * 项目编号
     */
    floor;
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
    stages = [{}];
    parsingStage = false;
    constructor({ floor, author, authorUrl }, json) {
        this.floor = floor;
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
                if ('name' in this.stageNow)
                    this.stages.push(this.stageNow = { name: '', timeStep: [], detail: [] });
                this.stageNow.name = getText(ele);
                this.stageNow.timeStep = [];
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
