export default class CnbApi {
    config;
    static baseHeader = { 'content-type': 'application/x-www-form-urlencoded' };
    requesterPromise;
    constructor(requesterIniter, config) {
        this.config = config;
        const requester = new requesterIniter(CnbApi.baseHeader);
        this.requesterPromise = this.login(requester);
    }
    async login(requester) {
        const body = await this.safeRequest(requester.send({
            method: "POST" /* Method.POST */,
            url: 'https://api.cnblogs.com/token',
            data: {
                client_id: this.config.id,
                client_secret: this.config.secret,
                grant_type: 'client_credentials',
            },
        }));
        const token = body.access_token;
        requester.baseHeader.authorization = `Bearer ${token}`;
        return requester;
    }
    async safeRequest(resultPromise) {
        const { ok, error, code, data, header } = await resultPromise;
        if (!ok)
            throw [error, code, header];
        return data;
    }
    async getPost(postId) {
        const requester = await this.requesterPromise;
        const body = await this.safeRequest(requester.send({
            method: "GET" /* Method.GET */,
            url: `https://api.cnblogs.com/api/blogposts/${postId}/body`,
        }));
        return body;
    }
}
