import { Button } from './Button';

type StepsProps = {
	steps: { label: string; icon: string }[];
	currentStep: number;
	setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
	orientation?: 'vertical' | 'horizontal' | 'responsive';
};

export const Steps: React.FC<StepsProps> = ({
	currentStep,
	setCurrentStep,
	steps,
	orientation = 'horizontal',
}) => {
	let classes = 'w-max steps';

	switch (orientation) {
		case 'vertical':
			classes += ' steps-vertical';
			break;
		case 'horizontal':
			classes += ' steps-horizontal  w-full';
			break;
		case 'responsive':
			classes += ' steps-vertical lg:steps-horizontal lg:w-full';
			break;
		default:
			break;
	}

	return (
		<ul className={classes}>
			{steps.map((step, index) => {
				const isCurrent = index <= currentStep;
				return (
					<li
						data-content={step.icon}
						className={` step${isCurrent ? ' step-primary' : ''}`}
						key={index}
					>
						<Button className='btn-ghost' onClick={() => setCurrentStep(index)}>
							{step.label}
						</Button>
					</li>
				);
			})}
		</ul>
	);
};
