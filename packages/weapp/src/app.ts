import { createContext, PropsWithChildren, useContext } from 'react';
import { useLaunch } from '@tarojs/taro';
import { getData } from './lib/data-content';

export default function App({ children }: PropsWithChildren<any>) {
	useLaunch(() => {
		console.log('App launched.');
	});

	return children;
}
