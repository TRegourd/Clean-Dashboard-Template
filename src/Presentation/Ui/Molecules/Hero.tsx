export interface HeroProps {
	title: string;
}

function Hero({ title }: HeroProps) {
	return (
		<div className='hero h-max bg-base-200 mb-2 rounded-box'>
			<div className='hero-content text-center'>
				<div className=''>
					<h1 className='text-5xl font-bold'>{title}</h1>
				</div>
			</div>
		</div>
	);
}

export default Hero;
