import CnbApi, { CnbConfig } from '@cauact/db/lib/CnbApi';
import { createContext } from 'react';
import Operator from '@cauact/db-operator-taro';

const indexPostId = 18437205;

export interface Data {}

export const DataContent = createContext<Data | null>(null);

export async function getData(cnbConfig: CnbConfig): Promise<Data> {
	const cnbApi = new CnbApi(new Operator(), cnbConfig);
	const indexPost = await cnbApi.getPost(indexPostId);
	console.log(indexPost);
	return {};
}
