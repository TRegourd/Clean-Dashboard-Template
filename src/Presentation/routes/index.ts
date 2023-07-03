import Home from '../views/Home';

import UserListView from '../views/Admin/Users/UserListView';

import LinkListView from '../views/Infos/Links/LinkListView';

import InfoAboutView from '../views/Infos/About/InfoAboutView';

import UserProfileView from '../views/User/UserProfile/UserProfileView';
import EditUserView from '../views/User/EditUser/EditUserView';

export interface RoutesProps {
	path: string;
	component: (params: RouteParams) => JSX.Element;
	name: string;
	adminRoute?: boolean;
}

export interface RouteParams {
	name: string;
}

const routes: RoutesProps[] = [
	{
		path: '/home', // the url (without app prefixe, added by the router in App.tsx)
		component: Home, // view rendered
		name: 'Bienvenue sur le portail BDD',
	},
	// -------------------- Admin --------------------------------
	{
		path: '/admin/users',
		component: UserListView,
		name: 'Liste des utilisateurs',
		adminRoute: true,
	},
	// -------------------- Infos --------------------------------
	{
		component: LinkListView,
		path: '/info/links',
		name: 'Liens Utiles',
	},
	{
		component: InfoAboutView,
		path: '/info/about',
		name: 'A Propos',
	},

	// ------------------------ User  --------------------------------

	{
		component: UserProfileView,
		path: '/profile',
		name: 'Profil',
	},
	{
		component: EditUserView,
		path: '/profile/update/:id',
		name: 'Editer le profil',
	},
];

export default routes;
