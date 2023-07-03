# Les UseCases (Couche Domain)

Les UseCases ou cas d'utilisation représentent les différentes actions que l'utilisateur peut effectuer dans l'application. Chaque UseCase encapsule une opération spécifique et détaille le comportement attendu de l'application pour cette opération.

Dans notre application, nous utilisons deux interfaces pour décrire les UseCases : UseCase et UseCaseWithParams.

## Interface UseCase

```typescript
export interface UseCase<T> {
	invoke(): Promise<T>;
}
```

`UseCase` est une interface générique qui définit une méthode invoke qui ne prend pas de paramètres et renvoie une `Promise<T>`, où `T` est le type de données renvoyées par le UseCase.

### Exemple

`GetUserListUseCase` est une implémentation de UseCase qui renvoie une promesse qui se résout en un tableau d'utilisateurs `User[]`.

```typescript
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

Dans notre exemple de UseCase, `repository` est une propriété privée de la classe `GetUserListUseCase`. Cela signifie que `repository` ne peut être accédée ou modifiée que dans le code qui fait partie de `GetUserListUseCase`. Cela garantit que `repository` est bien protégé et ne peut pas être modifié de manière inappropriée par d'autres parties de l'application.

Le constructeur de `GetUserListUseCase` prend un argument `_repository`, qui doit être un objet qui implémente l'[interface](repository_interface.md) `UserRepository`. Le constructeur affecte ensuite `_repository` à la propriété `repository` de la classe. Cela signifie que chaque fois que nous créons une nouvelle instance de `GetUserListUseCase`, nous devons lui fournir un objet qui correspond à l'interface `UserRepository`.

## Interface UseCaseWithParams

```ts
export interface UseCaseWithParams<Q, T> {
	invoke(params: Q): Promise<T>;
}
```

`UseCaseWithParams` est une interface qui définit une méthode invoke qui prend un paramètre de type `Q` et renvoie une `Promise<T>`, où `T` est le type de données renvoyées par le UseCase.

### Exemple

`UpdateUserByIdUseCase` est une implémentation de `UseCaseWithParams` qui prend un objet
`{ id: string; body: User }` comme paramètre et renvoie une promesse qui se résout en `void` (c'est-à-dire qu'elle ne renvoie pas de données).

```ts
export class UpdateUserByIdUseCase
	implements UseCaseWithParams<{ id: string; body: User }, void>
{
	private repository: UserRepository;
	constructor(_repository: UserRepository) {
		this.repository = _repository;
	}
	async invoke({ id, body }: { id: string; body: User }): Promise<void> {
		return await this.repository.updateUserById({ id, body });
	}
}
```

## Manipulation des données dans les UseCases

Un autre avantage important de la définition de UseCases dans notre architecture est qu'ils offrent un endroit approprié pour la manipulation des données avant qu'elles ne soient transmises aux [ViewModel](mvvm.md).

Par exemple, imaginons que nous avons un UseCase où nous récupérons une liste de tous les utilisateurs, mais que nous souhaitons fournir à un ViewModel spécifique une liste filtrée des utilisateurs ayant le rôle d'administrateur. Plutôt que de modifier le Repository (qui doit rester générique et réutilisable pour différentes parties de l'application), nous pourrions effectuer ce filtrage au sein du UseCase lui-même.

Voici comment cela pourrait être mis en œuvre :

```ts
export class GetAdminUserListUseCase implements UseCase<User[]> {
	private repository: UserRepository;
	constructor(_repository: UserRepository) {
		this.repository = _repository;
	}
	async invoke(): Promise<User[]> {
		const users = await this.repository.getUserList();
		return users.filter((user) => user.role === 'admin');
	}
}
```

Dans cet exemple, `GetAdminUserListUseCase` fait d'abord appel à `getUserList` pour obtenir la liste complète des utilisateurs. Il filtre ensuite cette liste pour ne retenir que les utilisateurs dont le rôle est 'admin', avant de renvoyer cette liste filtrée.

Ceci illustre comment les UseCases peuvent être utilisés non seulement pour déclencher des actions sur le Repository, mais aussi pour transformer et adapter les données en fonction des besoins spécifiques de chaque ViewModel.
