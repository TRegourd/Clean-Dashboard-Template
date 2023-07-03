import Markdown from 'markdown-to-jsx';
import React, { useEffect } from 'react';

import { RouteParams } from '../../../routes';
import TitleCard from '../../../Ui/Molecules/TitleCard';
import InfoAboutViewModel from './InfoAboutViewModel';

function InfoAboutView({ name }: RouteParams) {
	const { about, getAbout } = InfoAboutViewModel();

	useEffect(() => {
		getAbout();
	}, []);

	return (
		<TitleCard cardTitle={name}>
			<div className='prose text-start'>
				<Markdown>{about}</Markdown>
			</div>
		</TitleCard>
	);
}

export default InfoAboutView;
