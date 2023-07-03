# Interface du Repository (Couche Domain)

Une interface spécifie un ensemble de méthodes (et éventuellement de propriétés) que les classes qui implémentent cette interface doivent fournir. L'interface définit "quoi" doit être fait, mais pas "comment" il doit être fait. Le "comment" est défini par les classes qui implémentent cette interface.

Dans le cas d'un repository, l'interface sert à définir un ensemble standard d'opérations qui seront utilisées pour interagir avec une certaine entité ou type de données. En l'occurrence, ici l'interface UserRepository spécifie un ensemble d'opérations liées à la gestion des utilisateurs.

Cette interface assure une séparation des préoccupations et permet un couplage faible entre les différentes parties du code. Plus précisément, la définition d'une interface pour le repository permet d'abstraire la source de données utilisée, ce qui permet d'isoler la logique métier des détails de l'implémentation de la persistance des données. C'est ce qu'on appelle le principe de l'inversion de dépendance : les classes de haut niveau (ici, celles qui utilisent le repository : [useCase](use_case.md) et [viewModel](mvvm.md)) ne dépendent pas des classes de bas niveau (ici, les classes qui [implémentent](repository_implementation.md) le repository), mais dépendent des abstractions (ici, l'interface UserRepository).

Dans le cadre de notre exemple, l'interface `UserRepository` définit cinq méthodes : `getUserList()`, `getUserById()`, `updateUserById()`, `deleteUserById()`, et `postNewsletter()`. Toute classe qui implémente cette interface doit donc fournir ces cinq méthodes (sauf si l'on indique une méthode comme facultative via un ?). Toutefois, la manière dont chaque méthode atteint son objectif peut varier d'une implémentation à l'autre. Par exemple, une implémentation pourrait récupérer les utilisateurs d'une base de données, tandis qu'une autre pourrait les récupérer d'un service web via une API REST ou encore d'un fichier local.

Prenons le cas de l'interface `UserRepository` :

```typescript
import { User } from '../../Model/Users/User';

export interface UserRepository {
	getUserList(): Promise<User[]>;
	getUserById(id: string): Promise<User>;
	updateUserById({ id, body }: { id: string; body: User }): Promise<void>;
	deleteUserById(id: string): Promise<void>;
	postNewsletter(): Promise<void>;
}
```

## Importation du modèle User

La première ligne importe le [modèle](model.md) User. Le modèle User est une interface qui définit la structure des objets User dans notre application.

## Définition de l'interface UserRepository

`UserRepository` est une interface qui définit un ensemble de méthodes que toute classe qui se prétend être un repository pour les utilisateurs doit implémenter.

Voici une description de chaque méthode :

- ### Méthode `getUserList()`

  Cette méthode doit renvoyer une promesse qui se résout en un tableau d'objets `User`. L'idée ici est de récupérer tous les utilisateurs.

- ### Méthode `getUserById(id: string)`

  Cette méthode doit renvoyer une promesse qui se résout en un objet `User`. Elle prend l'ID d'un utilisateur comme argument et doit récupérer les informations de cet utilisateur.

- ### Méthode `updateUserById({ id, body }: { id: string; body: User })`

  Cette méthode doit renvoyer une promesse qui se résout en void. Elle prend un objet qui contient l'ID de l'utilisateur à mettre à jour et le nouvel objet User comme arguments. Cette méthode doit mettre à jour les informations de l'utilisateur spécifié.

- ### Méthode `deleteUserById(id: string)`

  Cette méthode doit renvoyer une promesse qui se résout en void. Elle prend l'ID d'un utilisateur comme argument et doit supprimer cet utilisateur.

- ### Méthode `postNewsletter()`

  Cette méthode doit renvoyer une promesse qui se résout en void. Elle est destinée à déclencher l'envoi d'une newsletter à tous les utilisateurs.

Notez que toutes ces méthodes renvoient des promesses. C'est parce que les opérations de récupération, de mise à jour, de suppression et d'envoi de newsletters sont généralement des opérations asynchrones - elles nécessitent un certain temps pour être accomplies et ne bloquent pas le reste du code en attendant leur achèvement.
