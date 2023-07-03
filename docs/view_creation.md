# Création d'une nouvelle Vue dans l'Application

Nous allons ici expliciter le processus de création d'une nouvelle Vue dans notre application, suivant un patern standard, quel que soit la vue ou les données manipulées. Cette standardisation est rendue possible grâce à notre architecture hexagonale combinée avec l'architecture [Model-View-ViewModel (MVVM)](mvvm.md).

## Étape 1 : Définition du Modèle

Définir l'interface du modèle qui représente les données que nous allons manipuler.

Exemple :

```ts
export interface User {
	_id?: string;
	email: string;
	username: string;
	role?: UserRole;
	lastLogin?: string;
	newsletter?: boolean;
}

export type UserRole = 'admin' | 'Dba' | 'User' | null;
```

## Étape 2 : Définition du Repository

Définir l'interface du repository qui liste les méthodes que le backend doit fournir.

Exemple :

```typescript
export interface UserRepository {
	getUserList(): Promise<User[]>;
	// ...
}
```

## Étape 3 : Définition du RepositoryImpl

Implémenter le repository défini précédemment en utilisant une instance d'Axios pour faire les appels au backend.

Exemple :

```ts
export class UserRepositoryImpl implements UserRepository {
	async getUserList(): Promise<User[]> {
		return ServerApi.get(`/user/liste`);
	}
	// ...
}
```

## Étape 4 : Définition du UseCase

Définir le UseCase qui utilisera le repository pour obtenir les données du backend et les manipuler si nécessaire avant de les renvoyer.

Exemple :

```ts
export class GetUserListUseCase implements UseCase<User[]> {
	private repository: UserRepository;
	constructor(_repository: UserRepository) {
		this.repository = _repository;
	}
	async invoke(): Promise<User[]> {
		return await this.repository.getUserList();
	}
}
```

## Étape 5 : Définition du ViewModel

Créez le ViewModel qui utilisera le UseCase pour obtenir les données et les fournir à la vue. Le ViewModel peut également fournir des méthodes pour interagir avec les données, comme des méthodes pour mettre à jour ou supprimer les données.

Exemple :

```ts
export default function UserListViewModel() {
	const [usersList, setUsersList] = useState<User[]>([]);

	const getListUseCase = new GetUserListUseCase(new UserRepositoryImpl());

	async function getUsersList() {
		try {
			const result = await getListUseCase.invoke();
			setUsersList(result);
		} catch (err) {
			throw err;
		}
	}

	return {
		getUsersList,
		usersList,
	};
}
```

## Étape 6 : Définition de la Vue

Créez la vue qui utilisera le ViewModel pour obtenir et afficher les données, et interagir avec elles.

Exemple :

```typescript
function UserListView({ name }: RouteParams) {
	const { usersList, getUsersList } = UserListViewModel();

	useEffect(() => {
		getUsersList();
	}, []);

	return <>// Affichage de userList à l'aide des composant d'UI</>;
}

export default UserListView;
```

## Étape 7 : Intégration de la vue au routeur de l'application

La nouvelle vue doit être intégrée au système de routage de l'application pour être accessible via une URL spécifique. Pour cela, importez la vue dans le fichier `index.ts` du dossier `src/Presentation/routes` et ajoutez une entrée correspondante dans le tableau de routes.

```ts
{
    path: '/users', // L'URL pour accéder à la vue (sans le préfixe de l'application, qui est ajouté par le routeur dans App.tsx)
    component: UserListView, // La vue à rendre (n'oubliez pas de l'importer)
    name: 'Liste des utilisateurs', // Le nom de la vue
}
```

## Étape 8 : Intégration de la vue à la barre de navigation (si nécessaire)

Si cette vue doit être accessible directement depuis la barre latérale de navigation, il vous faudra ajouter une entrée correspondante dans le fichier de configuration `sidebarRoutes.tsx` du dossier `src/Presentation/routes`. Cela permettra à l'application de générer le bouton de navigation correspondant.

```ts
{
    path: '/app/users', // L'URL pour accéder à la vue (avec le préfixe de l'application)
    name: 'Utilisateurs', // Le nom du bouton de navigation
},
```
