import { Puller } from '@cauact/db';
import { PropsWithChildren, useEffect, useState } from 'react';
import { Data, DataContent } from '../lib/data-content';
import { cnb } from '../lib/runtime-config';

export default function Base({ children }: PropsWithChildren) {
	const [data, setData] = useState<Data | null>(null);

	useEffect(() => {
		let reseted = false;
		setData(null);
		const puller = new Puller(cnb, cnb.postId, cnb.blogApp);
		(async () => {
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
