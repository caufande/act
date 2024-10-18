import CnbApi, { CnbConfig } from '@cauact/db/lib/CnbApi';
import { createContext } from 'react';

const indexPostId = 18437205;

export interface Data {}

export const DataContent = createContext<Data | null>(null);

export async function getData(cnbConfig: CnbConfig): Promise<Data> {
	const cnbApi = new CnbApi(cnbConfig);
	const indexPost = await cnbApi.getPost(indexPostId);
	console.log(indexPost);
	return {};
}
