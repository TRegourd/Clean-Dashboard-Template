import React from 'react';

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
	children?: React.ReactNode;
	className?: string;

	outline?: boolean;
	disabled?: boolean;
	onClick?: (event: React.MouseEvent<HTMLElement>) => void;
	type?: 'submit' | 'reset' | 'button';
}

export const Button = ({
	children,
	className,
	color,
	outline,
	disabled,
	onClick,
	type,
}: ButtonProps) => {
	return (
		<button
			type={type ? type : 'button'}
			className={`btn ${className}`}
			disabled={disabled}
			onClick={onClick}
		>
			{children}
		</button>
	);
};
