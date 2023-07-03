import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export interface CarouselItem {
	node: React.ReactNode;
	link?: string;
}

interface CarouselProps extends React.HTMLAttributes<HTMLElement> {
	slides: CarouselItem[];
	className?: string;
}

function Carousel({ slides, className, ...rest }: CarouselProps) {
	const [currentSlide, setCurrentSlide] = useState(0);

	const handlePrevious = () =>
		setCurrentSlide(
			(prevSlide) => (prevSlide - 1 + slides.length) % slides.length
		);
	const handleNext = () =>
		setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);

	return (
		<div className={`carousel w-full ${className}`} {...rest}>
			{slides.map((item, i) =>
				i === currentSlide ? (
					<div key={i} className='carousel-item relative w-full'>
						{item.link ? (
							<Link
								to={item.link}
								style={{ display: 'block', width: '100%', height: '100%' }}
							>
								{item.node}
							</Link>
						) : (
							item.node
						)}
						<div className='absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2'>
							<button onClick={handlePrevious} className='btn btn-ghost'>
								❮
							</button>
							<button onClick={handleNext} className='btn btn-ghost'>
								❯
							</button>
						</div>
					</div>
				) : null
			)}
		</div>
	);
}

export default Carousel;
