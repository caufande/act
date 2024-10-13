import { Requester, Storager } from '@cauact/db-operator-taro';
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
	const commitGetterRef = useRef<null | Storager<number>>(null);
	function getCnbApi() {
		return commitGetterRef.current ?? (commitGetterRef.current = new Storager<number>());
	}

	return (
		<View className="index">
			<Text>Hello world!{JSON.stringify(runtimeConfig.cnb, null, 2)}</Text>
			<Button onClick={() => getCnbApi().clear()
				.then(console.log)}>get</Button>
		</View>
	);
}
