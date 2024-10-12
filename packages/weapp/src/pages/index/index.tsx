import Requester from '@cauact/db-operator-taro/lib/Requester';
import CnbApi, { CommitGetter } from '@cauact/db/lib/CnbApi';
import { Button, Text, View } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import { useContext, useRef } from 'react';
import runtimeConfig from '../../lib/runtime-config';
import './index.less';
import { DataContent } from '../../lib/data-content';
import Base from '../../component/Base';

export default function Index() {
	return (
		<Base>
			<IndexMain />
		</Base>
	);
}

function IndexMain() {
	const commitGetterRef = useRef<null | CommitGetter>(null);
	function getCnbApi() {
		return commitGetterRef.current ?? (commitGetterRef.current = new CnbApi(Requester, runtimeConfig.cnb).getCommitGetter('CodeBlogMan', 17983370));
	}

	return (
		<View className="index">
			<Text>Hello world!{JSON.stringify(runtimeConfig.cnb, null, 2)}</Text>
			<Button onClick={() => getCnbApi().getAll()
				.then(console.log)}>get</Button>
		</View>
	);
}
