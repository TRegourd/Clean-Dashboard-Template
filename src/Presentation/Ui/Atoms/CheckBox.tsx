export interface CheckBoxProps
	extends React.HTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
	label?: React.ReactNode;
	name?: string;
	defaultChecked?: boolean;
	handleChange?: (value: any) => void;
	disabled?: boolean;
}

function CheckBox({
	label,
	name,
	handleChange,
	defaultChecked,
	disabled,
}: CheckBoxProps) {
	return (
		<div className='form-control w-max'>
			<label className='label cursor-pointer  flex flex-row gap-1'>
				{label && <span className={`label-text`}>{label}</span>}

				<input
					name={name}
					type={'checkbox'}
					className={`checkbox`}
					defaultChecked={defaultChecked}
					onChange={handleChange}
					disabled={disabled}
				/>
			</label>
		</div>
	);
}

export default CheckBox;
