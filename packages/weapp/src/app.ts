import { PropsWithChildren } from 'react';
import { useLaunch } from '@tarojs/taro';

export default function App({ children }: PropsWithChildren<any>) {
	useLaunch(() => {
		console.log('App launched.');
	});

	return children;
}
