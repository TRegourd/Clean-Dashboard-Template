import { useContext } from 'react';
import { AuthContext } from '../Hooks/AuthContext';

export interface SidebarRoute {
	path?: string;
	icon?: React.ReactNode;
	name: string;
	submenu?: SidebarRoute[];
}

export default function SideBarRoutes(): { routes: SidebarRoute[] } {
	const { userRole } = useContext(AuthContext);
	const iconClasses = `h-6 w-6`;

	let routes: SidebarRoute[] = [];

	// urls (with app prefixe)

	routes.push(
		{
			path: '',
			icon: <i className={`${iconClasses} fa-solid fa-database`} />,
			name: 'Bases de données',
			submenu: [
				{ name: 'Oracle', path: '/app/databases/liste/oracle' },
				{ name: 'MongoDb', path: '/app/databases/liste/mongodb' },
			],
		},
		{
			path: '',
			name: 'Rapports',
			icon: <i className={`${iconClasses} fa-solid fa-chart-simple`} />,
			submenu: [
				{
					name: 'Obsolescence',
					icon: (
						<i className={`${iconClasses} fa-solid fa-triangle-exclamation`} />
					),
				}, // Submenus divider, no path so the item is not clickable
				{
					name: 'Dette Technique',
					path: '/app/report/debt',
				},

				{
					name: 'Metriques',
					icon: <i className={`${iconClasses} fa-solid fa-chart-bar`} />,
				},
				{
					name: 'Repartition des bases',
					path: '/app/report/repartition',
				},

				{
					name: 'Supervision',
					icon: <i className={`${iconClasses} fa-solid fa-eye`} />,
				},

				{
					name: 'Etat des sauvegardes',
					path: '/app/report/backup',
				},
			],
		}
	);

	if (userRole === 'admin') {
		routes.push({
			path: '',
			icon: <i className={`${iconClasses} fa-solid fa-unlock`} />,
			name: 'Admin',
			submenu: [
				{
					path: '/app/admin/users',
					name: 'Utilisateurs',
				},
			],
		});
	}

	routes.push({
		path: '',
		icon: <i className={`${iconClasses} fa-solid fa-info-circle`} />,
		name: 'Informations',
		submenu: [
			{ name: 'A propos', path: '/app/info/about' },
			{ name: 'Liens utiles', path: '/app/info/links' },
		],
	});

	return { routes };
}
