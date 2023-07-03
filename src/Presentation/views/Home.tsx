import { useEffect } from 'react';
import { RouteParams } from '../routes';
import Hero from '../Ui/Molecules/Hero';
import DashboardCard from '../Ui/Molecules/DashboardCard';

function Home({ name }: RouteParams) {
	useEffect(() => {}, []);

	return (
		<>
			<Hero title={name} />
			<div className='grid xl:grid-cols-2 mt-4 grid-cols-1 gap-6'>
				<DashboardCard cardTitle='Taille des bases'>
					Graphiques de Taille
				</DashboardCard>

				<DashboardCard cardTitle='Repartition des bases'>
					Graphiques de Repartition
				</DashboardCard>
			</div>
		</>
	);
}

export default Home;
