import CnbApi from './CnbApi';
import { getOperator } from './Operator';
import { range } from './util';
const versionStartString = `<pre><code class="language-js">`;
const versionEndString = `</code></pre>`;
function getStorageKey(floor) {
    return `cauact_game_${floor}`;
}
const versionStorageKey = 'cauact_game_version';
export default class Puller {
    postId;
    blogApp;
    cnbApi;
    storagerVersion;
    storagerAct;
    constructor(cnbConfig, postId, blogApp) {
        this.postId = postId;
        this.blogApp = blogApp;
        const operator = getOperator();
        this.cnbApi = new CnbApi(cnbConfig);
        this.storagerVersion = new operator.storagerIniter();
        this.storagerAct = new operator.storagerIniter();
    }
    async getVersion() {
        const post = await this.cnbApi.getPost(this.postId);
        const startIndex = post.indexOf(versionStartString) + versionStartString.length;
        const endIndex = post.indexOf(versionEndString, startIndex);
        const data = post.slice(startIndex, endIndex);
        const version = JSON.parse(data);
        return version;
    }
    async getDiff(versionNow) {
        const versionLast = await this.storagerVersion.get(versionStorageKey);
        if (versionLast === null)
            return new Set(range(1, versionNow.length));
        if (versionNow[0] === versionLast[0])
            return new Set();
        const diff = new Set();
        versionNow.forEach((v, i) => {
            if (i !== 0 && versionLast[i] !== v)
                diff.add(i);
        });
        return diff;
    }
}
