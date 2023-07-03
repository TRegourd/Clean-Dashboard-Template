import React, { useState } from 'react';

interface CollapseProps extends React.HTMLAttributes<HTMLElement> {
	title: string;
	children: React.ReactNode;
	defaultOpen?: boolean;
	className?: string;
}

function Collapse({
	title,
	children,
	defaultOpen = false,
	className,
	...rest
}: CollapseProps) {
	const [isOpen, setIsOpen] = useState(defaultOpen);

	return (
		<details
			className={`bg-white shadow rounded group my-2 ${className}`}
			open={isOpen}
			onToggle={(event) => setIsOpen(event.currentTarget.open)}
			{...rest}
		>
			<summary
				className='list-none flex flex-wrap items-center cursor-pointer
focus-visible:outline-none focus-visible:ring focus-visible:ring-pink-500
rounded group-open:rounded-b-none group-open:z-[1] relative 
'
			>
				<h3 className='flex flex-1 p-4 font-semibold'>{title}</h3>
				<div className='flex w-10 items-center justify-center'>
					<div
						className={`border-8 border-transparent border-l-gray-600 ml-2 
              ${isOpen ? 'rotate-90' : ''} transition-transform origin-left`}
					></div>
				</div>
			</summary>
			<div className='p-4 mx-2 h-max'>{children}</div>
		</details>
	);
}

export default Collapse;
