import Operator from '@cauact/db-operator-node';
import { CnbApi, getOperator, Method, Puller, regOperator } from '@cauact/db/lib';
import { runtimeConfig } from './runtime-config';

regOperator(new Operator());

const cnbApi = new CnbApi(runtimeConfig.cnb);
await cnbApi.editPost({
	title: 'CAU ACTivity 活动目录',
	description: '这篇文章是中国农业大学活动目录的中转。\n下方是索引数据，评论是具体数据。\n\n```js\n[10,0,3]\n```',
	categories: ['[Markdown]'],
}, runtimeConfig.cnb.postId, runtimeConfig.cnb.blogApp);

