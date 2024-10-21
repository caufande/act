import { Text, View } from '@tarojs/components';
import Base from '../../component/Base';
import './index.less';


export default function Index() {
	return (
		<Base>
			<IndexMain />
		</Base>
	);
}

function IndexMain() {
	return (
		<View className="index" style={{ background: '#333', height: 800 }}>
			<Text userSelect={true}>Is my home</Text>
		</View>
	);
}
