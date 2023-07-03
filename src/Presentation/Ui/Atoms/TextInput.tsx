export interface TextInputProps
	extends React.HTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
	type: 'text' | 'textarea' | 'password' | 'email' | 'number';
	placeholder?: string;
	label?: React.ReactNode;
	name?: string;
	value?: string | number;
	defaultValue?: string | number;
	handleChange?: (value: any) => void;
	disabled?: boolean;
	required?: boolean;
}

function TextInput({
	type,
	placeholder,
	label,
	name,
	value,
	defaultValue,
	handleChange,
	disabled,
	required,
}: TextInputProps) {
	return (
		<div className='form-control w-full '>
			{label && (
				<label className='label'>
					<span className={`label-text-alt ${required && 'text-error'}`}>
						{label}
						{required ? '*' : ''}
					</span>
				</label>
			)}
			{type === 'textarea' ? (
				<textarea
					name={name}
					placeholder={placeholder ? placeholder : ''}
					className='textarea textarea-bordered textarea-md w-full '
					value={value || defaultValue}
					onChange={handleChange}
					disabled={disabled}
					required={required}
				/>
			) : (
				<input
					name={name}
					type={type}
					placeholder={placeholder ? placeholder : ''}
					className={`input input-bordered w-full`}
					value={value || defaultValue}
					onChange={handleChange}
					disabled={disabled}
					required={required}
				/>
			)}
		</div>
	);
}

export default TextInput;
