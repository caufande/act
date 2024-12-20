/**
 * 主页
 * @license AGPL-3.0-or-later
 */
declare module '.';

import { CnbApi, CommentGetter, parseComment } from '@cauact/db';
import { Button, Text, View } from '@tarojs/components';
import { useContext, useRef } from 'react';
import Base from '../../component/Base';
import { DataContent } from '../../lib/data-content';
import { runtimeConfig } from '@cauact/runner';
import './index.less';


export default function Index() {
	return (
		<Base>
			<IndexMain />
		</Base>
	);
}

function IndexMain() {
	const data = useContext(DataContent);
	const commentGetterRef = useRef<null | CnbApi>(null);
	function getCnbApi() {
		return commentGetterRef.current ?? (commentGetterRef.current = new CnbApi(
			runtimeConfig.cnb,
		));
	}
	console.log(JSON.stringify(data, null, 2));
	async function handleClick() {
		const cnbApi = getCnbApi();
	}

	return (
		<View className="index" style={{ background: '#333', height: 800 }}>
			<Text userSelect={true}>Hello world!</Text>
			<Button onClick={handleClick}>get</Button>
		</View>
	);
}
