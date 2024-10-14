import Operator from '@cauact/db-operator-taro';
import Puller from '@cauact/db/lib/Puller';
import { Button, Text, View } from '@tarojs/components';
import { useRef } from 'react';
import Base from '../../component/Base';
import runtimeConfig from '../../lib/runtime-config';
import './index.less';

export default function Index() {
	return (
		<Base>
			<IndexMain />
		</Base>
	);
}

function IndexMain() {
	const commentGetterRef = useRef<null | Puller>(null);
	function getCnbApi() {
		return commentGetterRef.current ?? (commentGetterRef.current = new Puller(
			new Operator(),
			runtimeConfig.cnb,
			18437205,
			'QiFande',
		));
	}

	return (
		<View className="index" style={{ background: '#333', height: 800 }}>
			<Text>Hello world!{JSON.stringify(runtimeConfig.cnb, null, 2)}</Text>
			<Button onClick={() => getCnbApi().getVersion()
				.then(n => getCnbApi().getDiff(n))
				.then(console.log)}>get</Button>
		</View>
	);
}
