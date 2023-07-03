import Subtitle from '../Atoms/Typography/Subtitle';

interface TitleCardProps extends React.HTMLAttributes<HTMLElement> {
	cardTitle?: React.ReactNode;
	children: React.ReactNode;
}

function TitleCard({ cardTitle, children }: TitleCardProps) {
	return (
		<div
			className={'card h-max w-full p-2 bg-base-100 overflow-x-auto mt-2 mb-2'}
		>
			{/* Title for Card */}
			{cardTitle && (
				<>
					<Subtitle>{cardTitle}</Subtitle>
					<div className='divider mt-2'></div>
				</>
			)}

			{/** Card Body */}
			<div className='h-full w-full p-2 bg-base-100 text-center'>
				{children}
			</div>
		</div>
	);
}

export default TitleCard;
