import React from 'react';

interface SelectProps {
	labelTitle?: React.ReactNode;
	name?: string;
	defaultValue?: string;
	className?: string;
	placeholder?: string;
	value?: string;
	options: {
		name: string;
		value: string;
		disabled?: boolean;
	}[];
	required?: boolean;
	handleChange?: (value: any) => void;
}

function Select(props: SelectProps) {
	const {
		labelTitle,
		name,
		defaultValue,
		className,
		placeholder,
		options,
		handleChange,
		value,
		required,
	} = props;

	return (
		<div className={`inline-block ${className}`}>
			<label className={`label`}>
				<div className={`label-text-alt ${required && 'text-error'}`}>
					{labelTitle}
					{required ? '*' : ''}
				</div>
			</label>
			<select
				className='select select-bordered w-full'
				name={name}
				value={value || defaultValue}
				onChange={handleChange}
				required={required}
			>
				<option disabled value='PLACEHOLDER'>
					{placeholder}
				</option>
				{options.map((o, k) => {
					return (
						<option
							disabled={o.disabled ? true : false}
							value={o.value || o.name}
							key={k}
						>
							{o.name}
						</option>
					);
				})}
			</select>
		</div>
	);
}

export default Select;
