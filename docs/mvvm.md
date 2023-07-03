# Modèle-View-ViewModel (MVVM) dans la couche de présentation

Dans cette application, les composants de View de la couche de présentation sont organisés selon le modèle Model-View-ViewModel (MVVM). C'est un modèle d'architecture qui facilite la séparation des préoccupations de développement de l'interface utilisateur.

## Model

Le [Model](model.md) représente les objets de données que le système peut manipuler. Dans notre cas, cela correspond aux entités de la couche Domain comme User dans l'exemple fourni. Ces modèles ne contiennent que les données et n'ont pas de logique métier.

## View

La View est responsable de la représentation visuelle des données à l'utilisateur. Il s'agit des composants React selon l'[atomic design](docs/atomic_design.md) dans notre application. Il est responsable de l'affichage des données utilisateur et de la collecte des actions de l'utilisateur, comme le clic sur un bouton.

## ViewModel

Le ViewModel agit comme un intermédiaire entre le Model et la View. Il contient la logiue nécessaire pour faire fonctionner la View :

- Il utilise les hooks React pour gérer l'état des données utilisateur (useState).
- Il utilise useContext pour accéder aux contextes de l'application.
- Il utilise les [Use Cases](use_case.md) du Domain pour effectuer des actions sur les données utilisateur.
- Il définit les fonctions qui effectuent ces actions. Ces fonctions sont ensuite utilisées par la View.

Le ViewModel contient donc la logique spécifique à la vue, tout en restant indépendant des détails spécifiques de la mise en œuvre de la View et du Model.

Cela permet de garder la View aussi indépendante que possible du reste de l'application, ce qui rend le code plus modulaire, plus facile à tester et à maintenir.

---

## Exemple d'utilisation

Prenons l'exemple de l'implémentation de l'affichage de la liste des utilisateurs.

Nous avons un composant View spécifique pour cette fonctionnalité, `UserListView`, et un ViewModel correspondant, `UserListViewModel`.

### Modèle

Dans ce cas, notre Modèle est l'interface `User` de la couche domaine. Il définit le type de données d'entrée attendu par les composants d'affichage.

### View

```ts
function UserListView({ name }: RouteParams) {
	const { usersList, getUsersList } = UserListViewModel();

	useEffect(() => {
		getUsersList();
	}, []);

	let statsData = [
		{
			title: `Nombre de d'utilisateurs enregristrés`,
			value: usersList?.length,
			icon: <i className='fa-solid fa-user-group pr-4 fa-xl '></i>,
		},
	];

	const columns: DataGridColsProps[] = [
		{
			field: 'username',
			headerName: `UserName`,
			width: 200,
		},
		// ... reste du tableau columns
	];

	return (
		<>
			<Hero title={name ? name : ''} />
			<div className='flex flex-row h-48 justify-around'>
				<Stats data={statsData} />
			</div>
			<div className='h-[75vh] w-full'>
				<DataGrid data={usersList} columns={columns} />
			</div>
		</>
	);
}

export default UserListView;
```

La `UserListView` est responsable de l'affichage de la liste des utilisateurs. Elle utilise le `UserListViewModel` pour obtenir les données nécessaires à son affichage (`usersList`) et pour déclencher l'action de récupération de la liste des utilisateurs (`getUsersList()`). Les données sont ensuite passées à des composants d'affichage, tels que Stats et DataGrid, pour afficher les informations de manière appropriée.

Les colonnes de la DataGrid sont définies dans le composant `UserListView` (ou dans un composant de niveau inférieur dans certains cas). Chaque entrée dans le tableau `columns` définit la manière dont une propriété spécifique d'un `User` est affichée. Pour plus d'informations sur la définition des colonnes, vous pouvez consulter le document d'[ajout d'un colonne à une Datagrid](/docs/add_datagrid_column.md)

### ViewModel

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

Le `UserListViewModel` est responsable de la logique liée à l'affichage de la liste des utilisateurs. Il utilise le [Use Case](use_case.md) de la couche Domain pour récupérer et mettre à jour la liste des utilisateurs (`GetUserListUseCase`) et fourni à la view la fonction (`getUserList()`) permettant de déclencher la récupération ainsi que la liste courante des utilisateurs.
Cette liste est stockée dans une variable d'état React (state) qui doit impérativement etre un tableau de `User`.
