import { Steps } from '../Atoms/Steps';
import TitleCard from './TitleCard';
import { Button } from '../Atoms/Button';

type StepperProps = {
	steps: Step[];
	currentStep: number;
	setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
	orientation?: 'vertical' | 'horizontal' | 'responsive';
};

type Step = {
	title: string;
	icon?: string;
	body: React.ReactNode;
};

export const Stepper: React.FC<StepperProps> = ({
	currentStep,
	setCurrentStep,
	steps,
}) => {
	return (
		<>
			<div className='flex flex-row lg:flex-col gap-2'>
				<Steps
					steps={steps.map((step) => {
						return { label: step.title, icon: step.icon ? step.icon : '' };
					})}
					currentStep={currentStep}
					setCurrentStep={setCurrentStep}
					orientation='responsive'
				/>
				<div className='flex flex-col lg:flex-row gap-2 justify-around p-4'>
					<Button
						disabled={currentStep === 0}
						className='btn-secondary'
						onClick={() => setCurrentStep(currentStep - 1)}
					>
						Précédent
					</Button>

					<Button
						disabled={currentStep === steps.length - 1}
						className='btn-primary'
						onClick={() => {
							setCurrentStep(currentStep + 1);
						}}
					>
						Suivant
					</Button>
				</div>
				<TitleCard>
					{steps && steps[currentStep] && (
						<div className='py-2'>{steps[currentStep].body}</div>
					)}
				</TitleCard>
			</div>
		</>
	);
};
