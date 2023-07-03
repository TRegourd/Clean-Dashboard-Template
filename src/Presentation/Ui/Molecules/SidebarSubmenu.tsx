import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SidebarRoute } from '../../routes/sidebarRoutes';

function SidebarSubmenu({ submenu, name, icon }: SidebarRoute) {
	const location = useLocation();
	const [isExpanded, setIsExpanded] = useState(false);

	useEffect(() => {
		if (
			submenu?.filter((menu) => {
				return menu.path && menu.path === location.pathname;
			})[0]
		)
			setIsExpanded(true);
	}, []);

	return (
		<div className='flex-col'>
			{/** Route header */}
			<div className='w-full' onClick={() => setIsExpanded(!isExpanded)}>
				{icon} {name}
				<i
					className={
						'w-5 h-5 mt-1 float-right delay-400 duration-500 transition-all fa-solid fa-chevron-down ' +
						(isExpanded ? 'rotate-180' : '')
					}
				/>
			</div>

			{/** Submenu list */}
			<div className={` w-full ` + (isExpanded ? '' : 'hidden')}>
				<ul className={`menu menu-compact`}>
					{submenu?.map((menu, index) => {
						if (!menu.path) {
							return (
								<li key={index}>
									<div className='block items-center  cursor-default hover:bg-transparent'>
										<span>{menu.icon}</span>
										<span className='italic px-1 font-semibold'>
											{menu.name}
										</span>
									</div>
								</li>
							);
						} else {
							return (
								<li key={index}>
									<Link to={menu.path}>
										{menu.icon} {menu.name}
										{location.pathname === menu.path ? (
											<span
												className='absolute mt-1 mb-1 inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary '
												aria-hidden='true'
											></span>
										) : null}
									</Link>
								</li>
							);
						}
					})}
				</ul>
			</div>
		</div>
	);
}

export default SidebarSubmenu;
