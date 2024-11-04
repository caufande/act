import { CnbApi, regOperator } from '@cauact/db';
import Operator from '@cauact/db-operator-node';
import { runtimeConfig } from './runtime-config';

regOperator(new Operator(true));
const cnbApi = new CnbApi(runtimeConfig.cnb);
await new Promise(r => setTimeout(r, 2000));
const rs = await Promise.all([
	cnbApi.getPost(runtimeConfig.cnb.groupsPostId),
	cnbApi.getPost(runtimeConfig.cnb.groupsPostId),
	cnbApi.getPost(runtimeConfig.cnb.groupsPostId),
	cnbApi.getPost(runtimeConfig.cnb.groupsPostId),
	cnbApi.getPost(runtimeConfig.cnb.groupsPostId),
]);
console.log(rs.map(n => n.length));
// const parsed = await parseGroups(postHtml);
// console.log(parsed);


