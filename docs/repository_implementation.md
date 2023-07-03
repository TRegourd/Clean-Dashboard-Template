# Implémentation d'un Repository (Couche Data)

L'implémentation du Repository joue un rôle crucial en tant que pont entre la couche Data et la couche Domain. En effet, il est responsable de la récupération des données, qu'elles soient en local ou sur un serveur distant. Les composants de l'application n'interagissent qu'avec la couche Domain, qui utilise le Repository pour accéder aux données. Ceci assure un découplage entre la source des données et la logique de l'application.

Dans cet exemple, nous allons détailler l'implémentation de la récupération d'un utilisateur.

```typescript
import { ServerApi } from '../config';
import { User } from '../../../Domain/Model/Users/User';
import { UserRepository } from '../../../Domain/Repository/Users/UserRepository';

export class UserRepositoryImpl implements UserRepository {
	async getUserById(id: string): Promise<User> {
		return ServerApi.get(`/user/profile/${id}`);
	}
	// ... Autres méthodes de UserRepository
}
```

## Importation des dépendances

Trois importations sont effectuées ici :

- `ServerApi` : Il s'agit de l'instance personnalisée d'Axios, utilisée pour effectuer des requêtes HTTP.
- `User` : Il s'agit du [modèle](model.md) ou de l'interface de l'objet User dans l'application. Il définit la structure des objets User.
- `UserRepository` : Il s'agit de l'[interface](repository_interface.md) pour le dépôt ou repository User. Elle définit quelles méthodes doivent être implémentées par toute classe qui prétend être un dépôt User.

## Définition de la classe

`UserRepositoryImpl` est défini comme une classe qui implémente `UserRepository`. Cela signifie que `UserRepositoryImpl` doit implémenter toutes les méthodes définies dans `UserRepository`.

## Méthode getUserById(id: string)

C'est une fonction asynchrone qui prend un ID utilisateur en argument et renvoie une `Promise` qui se résout en `User`. La méthode fait une requête GET à l'endpoint `/user/profile/{id}` via `ServerApi.get()`. Lorsque la promesse de cette requête GET est résolue, la méthode renvoie le `User` reçu de l'API. Si l'API renvoie une erreur, la promesse est rejetée et l'erreur est propagée jusqu'à l'appelant de cette méthode.

De la même manière, l'implémentation du repository doit définir la manière d'implémenter toutes les autres méthodes obligatoires de l'interface UserRepository (updateUserById, etc.).
