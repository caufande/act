import Operator from '@cauact/db-operator-taro';
import { regOperator } from '@cauact/db/lib/Operator';
import { useLaunch } from '@tarojs/taro';
import { PropsWithChildren } from 'react';

export default function App({ children }: PropsWithChildren<any>) {
	useLaunch(() => {
		regOperator(new Operator());
	});

	return children;
}
