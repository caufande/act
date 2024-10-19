import Operator from '@cauact/db-operator-taro';
import { regOperator } from '@cauact/db/lib/Operator';
import { useLaunch } from '@tarojs/taro';
import { PropsWithChildren } from 'react';

regOperator(new Operator());

export default function App({ children }: PropsWithChildren<any>) {
	useLaunch(() => { 1; });

	return children;
}
