import Operator from '@cauact/db-operator-taro';
import Puller from '@cauact/db/lib/Puller';
import { Button, Text, View } from '@tarojs/components';
import { useContext, useRef } from 'react';
import Base from '../../component/Base';
import runtimeConfig from '../../lib/runtime-config';
import './index.less';
import CnbApi, { CommentGetter } from '@cauact/db/lib/CnbApi';
import parseComment from '@cauact/db/lib/parseComment';
import { DataContent } from '../../lib/data-content';


export default function Index() {
	return (
		<Base>
			<IndexMain />
		</Base>
	);
}

function IndexMain() {
	const data = useContext(DataContent);
	const commentGetterRef = useRef<null | CommentGetter>(null);
	function getCnbApi() {
		return commentGetterRef.current ?? (commentGetterRef.current = new CnbApi(
			runtimeConfig.cnb,
		).getCommentGetter('QiFande', 18437205));
	}

	return (
		<View className="index" style={{ background: '#333', height: 800 }}>
			<Text>Hello world!{JSON.stringify(data)}</Text>
			<Button onClick={() => getCnbApi().getAll()
				.then(n => parseComment(n[0]))
				.then(console.log)}>get</Button>
		</View>
	);
}
