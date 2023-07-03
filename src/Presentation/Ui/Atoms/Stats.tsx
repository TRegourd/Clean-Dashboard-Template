export interface StatsProps {
	title: string;
	value: React.ReactNode;
	desc?: React.ReactNode;
	icon?: React.ReactNode;
}

function Stats({ data }: { data: StatsProps[] }) {
	return (
		<div className='flex flex-wrap gap-2 justify-center'>
			{data.map((stat: StatsProps, index: number) => {
				return (
					<div key={index} className='stats shadow w-max'>
						<div className='stat'>
							<div className={`stat-figure text-primary`}>{stat.icon}</div>
							<div className='stat-title'>{stat.title}</div>
							<div className='stat-value'>{stat.value}</div>
							<div className='stat-desc'>{stat.desc}</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default Stats;
