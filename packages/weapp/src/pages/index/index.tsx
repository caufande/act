import { Requester, Storager } from '@cauact/db-operator-taro';
import CnbApi, { CommitGetter } from '@cauact/db/lib/CnbApi';
import { Button, Text, View } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import { useContext, useRef } from 'react';
import runtimeConfig from '../../lib/runtime-config';
import './index.less';
import { DataContent } from '../../lib/data-content';
import Puller, { Act, Version } from '@cauact/db/lib/Puller';
import Base from '../../component/Base';

export default function Index() {
	return (
		<Base>
			<IndexMain />
		</Base>
	);
}

function IndexMain() {
	const commitGetterRef = useRef<null | Puller>(null);
	function getCnbApi() {
		if (commitGetterRef.current) return commitGetterRef.current;
		const storager = new Storager<any>();
		return commitGetterRef.current ?? (commitGetterRef.current = new Puller(
			18437205,
			runtimeConfig.cnb,
			Requester,
			storager,
			storager,
		));
	}

	return (
		<View className="index" style={{ background: '#333', height: 800 }}>
			<Text>Hello world!{JSON.stringify(runtimeConfig.cnb, null, 2)}</Text>
			<Button onClick={() => getCnbApi().getDiff()
				.then(console.log)}>get</Button>
		</View>
	);
}
