import Requester from '@cauact/db-operator-taro/lib/Requester';
import CnbApi from '@cauact/db/lib/CnbApi';
import { Button, Text, View } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import { useRef } from 'react';
import runtimeConfig from '../../lib/runtime-config';
import './index.less';


export default function Index() {
	useLoad(() => {
		console.log('Page loaded.');
	});

	const CnbApiRef = useRef<null | CnbApi>(null);
	function getCnbApi() {
		return CnbApiRef.current ?? (CnbApiRef.current = new CnbApi(Requester, runtimeConfig.cnb));
	}

	return (
		<View className="index">
			<Text>Hello world!{JSON.stringify(runtimeConfig.cnb, null, 2)}</Text>
			<Button onClick={() => getCnbApi().getPost(18437205)
				.then(console.log)}>get</Button>
		</View>
	);
}
