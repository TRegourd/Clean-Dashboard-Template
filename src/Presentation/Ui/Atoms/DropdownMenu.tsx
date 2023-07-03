export interface DropdownMenuProps
	extends React.HTMLAttributes<HTMLButtonElement> {
	menus: React.ReactNode[];
	buttonLabel: string;
	buttonClassName?: string;
	hover: boolean;
}

export default function DropdownMenu({
	menus,
	buttonClassName,
	buttonLabel,
	hover,
}: DropdownMenuProps) {
	return (
		<div className={`dropdown dropdown-end ${hover ? 'dropdown-hover' : ''}`}>
			<label tabIndex={0} className={`btn  m-1 ${buttonClassName}`}>
				{buttonLabel}
			</label>
			<ul
				tabIndex={0}
				className={`dropdown-content menu p-2 shadow bg-base-100 rounded-box w-max `}
			>
				{menus.map((menu, index) => {
					return <li key={index}>{menu}</li>;
				})}
			</ul>
		</div>
	);
}
