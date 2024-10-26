import { CnbApi, parseGroups, regOperator } from '@cauact/db';
import Operator from '@cauact/db-operator-node';
import { runtimeConfig } from './runtime-config';

regOperator(new Operator());
const cnbApi = new CnbApi(runtimeConfig.cnb);
const postHtml = await cnbApi.getPost(runtimeConfig.cnb.groupsPostId);
const parsed = await parseGroups(postHtml);
console.log(parsed);

