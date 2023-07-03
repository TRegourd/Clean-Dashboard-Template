import { useEffect } from 'react';

import InfoCard from '../../../Ui/Molecules/InfoCard';
import InfoUsefulLinkViewModel from './LinkListViewModel';

function UsefulLinkListView() {
	const { usefulLinks, getUsefulLinks } = InfoUsefulLinkViewModel();

	useEffect(() => {
		getUsefulLinks();
	}, []);

	return (
		<div>
			<div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6'>
				{usefulLinks &&
					usefulLinks.map((usefulLink, index) => {
						return (
							<InfoCard
								key={index}
								title={usefulLink.title}
								description={usefulLink.description}
								badges={usefulLink.badges}
								infos={usefulLink.infos}
								link={usefulLink.link}
							/>
						);
					})}
			</div>
		</div>
	);
}

export default UsefulLinkListView;
