import { PropsWithChildren, useEffect, useState } from 'react';
import { Data, DataContent, getData } from '../lib/data-content';
import runtimeConfig from '../lib/runtime-config';

export default function Base({ children }: PropsWithChildren) {
	const [data, setData] = useState<Data | null>(null);

	// useEffect(() => {
	// 	let getted = false;
	// 	setData(null);
	// 	getData(runtimeConfig.cnb).then(data => {
	// 		if (!getted) setData(data);
	// 	});
	// 	return () => { getted = true; };
	// }, []);

	return (
		<DataContent.Provider value={data}>
			{children}
		</DataContent.Provider>
	);
}
