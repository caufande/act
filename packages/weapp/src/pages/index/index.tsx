import Operator from '@cauact/db-operator-taro';
import Puller from '@cauact/db/lib/Puller';
import { Button, Text, View } from '@tarojs/components';
import { useRef } from 'react';
import Base from '../../component/Base';
import runtimeConfig from '../../lib/runtime-config';
import './index.less';
import CnbApi, { CommentGetter } from '@cauact/db/lib/CnbApi';
import CommentParser from '@cauact/db/lib/CommentParser';


export default function Index() {
	return (
		<Base>
			<IndexMain />
		</Base>
	);
}

function IndexMain() {
	const commentGetterRef = useRef<null | CommentGetter>(null);
	function getCnbApi() {
		return commentGetterRef.current ?? (commentGetterRef.current = new CnbApi(
			new Operator(),
			runtimeConfig.cnb,
		).getCommentGetter('QiFande', 18437205));
	}
	console.log(BigInt('2') ** BigInt('64'));

	return (
		<View className="index" style={{ background: '#333', height: 800 }}>
			<Text>Hello world!{JSON.stringify(runtimeConfig.cnb, null, 2)}</Text>
			<Button onClick={() => getCnbApi().getAll()
				.then(n => new CommentParser(n[0]))
				.then(console.log)}>get</Button>
		</View>
	);
}
