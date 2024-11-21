import { Type } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import CnbApi from './CnbApi';
import { throwError } from './errors';
import { CheckingType, getOperator } from './Operator';
import parseComment, { Act } from './parseComment';
import { range } from './util';
export const Version = Type.Array(Type.Number());
export const VerInfo = Type.Object({
    version: Version,
    diff: Type.Unknown(),
});
export default class Puller {
    actPostId;
    static verStartStr = `<pre><code class="language-js">`;
    static verEndStr = `</code></pre>`;
    static keySign = 'cauact_game';
    static getKey(floor) {
        return `${this.keySign}_${floor}`;
    }
    static versionKey = `${this.keySign}_version`;
    cnbApi;
    commentGetter;
    storagerVersion;
    storagerAct;
    constructor(cnbConfig, actPostId, { checkingType = CheckingType.None } = {}) {
        this.actPostId = actPostId;
        const operator = getOperator();
        this.cnbApi = new CnbApi(cnbConfig);
        this.commentGetter = this.cnbApi.getCommentGetter(actPostId);
        this.storagerVersion = new operator.storagerIniter({
            asserter: n => Value.Assert(Version, n),
            checkingType,
        });
        this.storagerAct = new operator.storagerIniter({
            asserter: Act.assert,
            deserializer: Act.deserializer,
            checkingType,
        });
    }
    async getStoragedAct(floor) {
        return await this.storagerAct.get(Puller.getKey(floor));
    }
    async setStoragedAct(floor, act) {
        return await this.storagerAct.set(Puller.getKey(floor), act);
    }
    async getStoragedVersion() {
        return await this.storagerVersion.get(Puller.versionKey);
    }
    async setStoragedVersion(version) {
        return await this.storagerVersion.set(Puller.versionKey, version);
    }
    cachedVerInfo = null;
    async getDiff(versionNow, versionLast = null) {
        if (versionLast === null)
            return new Set(range(1, versionNow.length));
        if (versionNow[0] === versionLast[0])
            return new Set();
        const diff = new Set();
        versionNow.forEach((version, floor) => {
            if (floor !== 0 && versionLast[floor] !== version)
                diff.add(floor);
        });
        return diff;
    }
    async reqVerInfo() {
        const post = await this.cnbApi.getPost(this.actPostId);
        const startIndex = post.indexOf(Puller.verStartStr) + Puller.verStartStr.length;
        const endIndex = post.indexOf(Puller.verEndStr, startIndex);
        const data = post.slice(startIndex, endIndex);
        const version = JSON.parse(data);
        Value.Assert(Version, version);
        return version;
    }
    async update() {
        const version = await this.reqVerInfo();
        const versionLast = await this.getStoragedVersion();
        const verInfo = {
            version,
            diff: await this.getDiff(version, versionLast),
        };
        this.cachedVerInfo = verInfo;
        await this.setStoragedVersion(verInfo.version);
        return verInfo;
    }
    async getStoragedVerInfo() {
        const version = await this.getStoragedVersion();
        if (version === null)
            return null;
        return { version, diff: new Set() };
    }
    async getVerInfo() {
        return this.cachedVerInfo ?? await this.getStoragedVerInfo() ?? await this.update();
    }
    cachedAct = [];
    async reqAct(floor) {
        const comment = await this.commentGetter.getFloor(floor) ?? throwError('NoComment', { floor });
        const act = parseComment(comment);
        this.cachedVerInfo?.diff.delete(floor);
        this.cachedAct[floor] = act;
        await this.setStoragedAct(floor, act);
        return act;
    }
    async getAct(floor) {
        if (this.cachedVerInfo?.diff.has(floor))
            return await this.reqAct(floor);
        return this.cachedAct[floor]
            ?? await this.storagerAct.get(Puller.getKey(floor))
            ?? await this.reqAct(floor);
    }
    async upgradeAll() {
        await Promise.allSettled(Array.from(this.cachedVerInfo?.diff ?? [])
            .map(async (floor) => await this.setStoragedAct(floor, await this.reqAct(floor))));
    }
    async getActAll() {
        const version = (await this.getVerInfo()).version;
        const acts = await Promise.all(range(1, version.length).map(floor => this.getAct(floor)));
        acts.unshift(null);
        return acts;
    }
    async getAll() {
        return {
            verInfo: await this.getVerInfo(),
            acts: await this.getActAll(),
        };
    }
}
