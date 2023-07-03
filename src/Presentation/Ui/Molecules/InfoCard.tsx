import { Button } from '../Atoms/Button';

export interface InfoCardProps {
	title: string;
	description: React.ReactNode;
	infos?: React.ReactNode[];
	link?: string;
	badges?: string[];
}

function InfoCard({ title, description, infos, link, badges }: InfoCardProps) {
	return (
		<div className='card w-100 bg-base-100 shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300'>
			<div className='card-body '>
				<h2 className='card-title'>{title}</h2>
				<div className='divider' />
				<div>{description}</div>
				<ul className=' flex flex-col items-start'>
					{infos?.map((info, index) => {
						return <li key={index}>{info}</li>;
					})}
				</ul>
				<div className='divider' />
				<div className='flex flex-col justify-center gap-2'>
					{link && (
						<a href={link} target='_blank' rel='noreferrer' className='w-full'>
							<Button className='btn btn-primary overflow-hidden w-full'>
								<i className='fa-solid fa-arrow-up-right-from-square pr-2' />
								Lien
							</Button>{' '}
						</a>
					)}
					<div className='flex flex-row whitespace-nowrap flex-wrap gap-1 justify-center items-center'>
						{badges?.map((badge, index) => {
							return (
								<span key={index} className='badge badge-outline'>
									{badge}
								</span>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}

export default InfoCard;
