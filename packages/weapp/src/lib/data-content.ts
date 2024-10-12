import CnbApi, { CnbConfig } from '@cauact/db/lib/CnbApi';
import { createContext } from 'react';
import RequestIniter from '@cauact/db-operator-taro/lib/Requester';

const indexPostId = 18437205;

export interface Data {}

export const DataContent = createContext<Data | null>(null);


export async function getData(cnbConfig: CnbConfig): Promise<Data> {
	const cnbApi = new CnbApi(RequestIniter, cnbConfig);
	const indexPost = await cnbApi.getPost(indexPostId);
	console.log(indexPost);
	return {};
}
