import React from 'react';
import Select from 'react-select';

interface SelectMultipleProps {
	labelTitle?: React.ReactNode;
	name?: string;
	defaultValue?: string[];
	className?: string;
	value?: string[];
	options: {
		label: string;
		value: string;
	}[];
	required?: boolean;
	handleChange?: (value: any) => void;
}

function SelectMultiple(props: SelectMultipleProps) {
	const {
		labelTitle,
		name,
		defaultValue,
		className,
		options,
		handleChange,
		value,
		required,
	} = props;

	return (
		<div className={`inline-block ${className} `}>
			<label className={`label`}>
				<div className={`label-text-alt ${required && 'text-error'}`}>
					{labelTitle}
					{required ? '*' : ''}
				</div>
			</label>
			<Select
				options={options}
				isMulti
				name={name}
				onChange={handleChange}
				value={
					value &&
					value.map((item) => {
						return { label: item, value: item };
					})
				}
				defaultValue={
					defaultValue &&
					defaultValue.map((item) => {
						return { label: item, value: item };
					})
				}
			/>
		</div>
	);
}

export default SelectMultiple;
