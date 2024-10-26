import { Puller } from '@cauact/db';
import { PropsWithChildren, useEffect, useState } from 'react';
import { Data, DataContent } from '../lib/data-content';
import { runtimeConfig } from '@cauact/runner';

const { cnb } = runtimeConfig;

export default function Base({ children }: PropsWithChildren) {
	const [data, setData] = useState<Data | null>(null);

	useEffect(() => {
		let reseted = false;
		setData(null);
		const puller = new Puller(cnb, cnb.actPostId);
		(async () => {
			await puller.update();
			const pulled = await puller.getAll();
			if (reseted) return;
			setData(pulled);
		})();
		return () => { reseted = true; };
	}, [cnb]);

	return (
		<DataContent.Provider value={data}>
			{children}
		</DataContent.Provider>
	);
}
