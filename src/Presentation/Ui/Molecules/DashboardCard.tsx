import Subtitle from '../Atoms/Typography/Subtitle';

interface DashboardCardProps extends React.HTMLAttributes<HTMLElement> {
	cardTitle?: React.ReactNode;
	children: React.ReactNode;
}

function DashboardCard({ cardTitle, children }: DashboardCardProps) {
	return (
		<div className={'card  w-full bg-base-200 px-5 overflow-x-auto mb-2'}>
			{/* Title for Card */}
			{cardTitle && (
				<div className='mt-2'>
					<Subtitle>{cardTitle}</Subtitle>
					<div className='divider mt-2'></div>
				</div>
			)}

			{/** Card Body */}
			<div className='h-full w-full  pb-6 text-center'>{children}</div>
		</div>
	);
}

export default DashboardCard;
