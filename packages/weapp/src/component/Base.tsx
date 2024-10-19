import { PropsWithChildren, useEffect, useState } from 'react';
import { cnb } from '../lib/runtime-config';
import { Data, DataContent } from '../lib/data-content';
import Puller from '@cauact/db/lib/Puller';

export default function Base({ children }: PropsWithChildren) {
	const [data, setData] = useState<Data | null>(null);

	useEffect(() => {
		let reseted = false;
		setData(null);
		const puller = new Puller(cnb, cnb.postId, cnb.blogApp);
		(async () => {
			const verInfo = await puller.update();
			if (reseted) return;
			setData(verInfo);
		})();
		return () => { reseted = true; };
	}, []);

	return (
		<DataContent.Provider value={data}>
			{children}
		</DataContent.Provider>
	);
}
