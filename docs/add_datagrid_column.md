# Ajouter une Propriété à la Datagrid

Dans ce guide, nous expliquerons comment ajouter une nouvelle propriété à la datagrid de notre vue UserListView. En l'occurrence, nous ajouterons un champ "phone" pour afficher le numéro de téléphone des utilisateurs. Pour ce faire, nous devons nous assurer que :

- La donnée est bien fournie par le backend
- Le modèle User est au courant de cette nouvelle donnée
- Une nouvelle entrée est ajoutée à la variable columns qui gère l'affichage de la datagrid

Avant de commencer, nous devons comprendre ce qu'est un objet DataGridColsProps. Il s'agit d'un objet qui spécifie comment chaque colonne de la datagrid doit être traitée et affichée. Voici les propriétés de cet objet :

- `field`: le nom du champ tel qu'il apparaît dans le modèle de données. C'est à partir de ce champ que la datagrid extrait la valeur à afficher.
- `headerName`: le nom affiché en en-tête de colonne dans la datagrid.
- `width`: la largeur de la colonne dans la datagrid.
- `renderCell` (optionnel): une fonction de rendu personnalisée pour la cellule. Cette fonction reçoit l'objet ligne et doit renvoyer un élément React.
- `valueGetter` (optionnel): une fonction pour obtenir la valeur d'une cellule à partir de l'objet ligne.

Commençons par ajouter la propriété `phone` à notre modèle User :

```ts
// src/Domain/Model/Users/User.ts
export interface User {
	id: string;
	email: string;
	role: UserRole;
	newsletter: boolean;
	username: string;
	phone: string; // Nouvelle propriété
}
```

Maintenant, nous pouvons ajouter la nouvelle entrée correspondante dans `columns` :

```ts
// src/Presentation/Views/UserListView.tsx
const columns: DataGridColsProps<User>[] = [
	{
		field: 'username',
		headerName: `UserName`,
		width: 200,
	},
	{ field: 'email', headerName: 'Email', width: 300 },
	{ field: 'role', headerName: 'Rôle', width: 200 },
	// ... autres colonnes
	{ field: 'phone', headerName: 'Phone', width: 150 }, // Nouvelle colonne
];
```

C'est tout! Avec ces modifications, la colonne "Phone" devrait maintenant apparaître dans la datagrid de la vue `UserListView`, affichant le numéro de téléphone de chaque utilisateur.
