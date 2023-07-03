# Définition d'Interfaces et Types de modèles (Couche Domain)

En TypeScript, les interfaces et les types sont des outils fondamentaux pour définir et garantir la structure des données au sein d'une application. C'est particulièrement important dans une application large et complexe, où une certaine cohérence et prévisibilité des données sont requises.

En typant les données, nous garantissons que toutes les données manipulées à travers l'application ont une structure uniforme et prévisible. Cela réduit le risque d'erreurs causées par des données mal formées ou inattendues (comme la fameuse 'cannot read properties of undefined') et facilite le travail avec ces données, puisque nous pouvons être sûrs de leur forme à tout moment.

De plus, en typant les réponses de nos requêtes API, nous nous assurons que les données que nous recevons du backend respectent le contrat défini par nos modèles. Si le backend devait renvoyer des données qui ne respectent pas ce contrat, TypeScript nous signalerait une erreur, ce qui nous permet de détecter et corriger rapidement ces problèmes.

## Rôle dans l'architecture MVVM

En plus de garantir la cohérence et l'intégrité des données, les interfaces de modèles jouent un rôle crucial dans l'implémentation de notre architecture [MVVM](mvvm.md).

Dans le cadre du MVVM, les interfaces de modèle facilitent la séparation entre la logique de l'interface utilisateur (la vue) et la logique métier (le modèle). En définissant clairement la structure des données avec lesquelles les composants de l'interface utilisateur doivent travailler, nous sommes en mesure d'isoler et de gérer efficacement la complexité inhérente à chaque partie de notre application.

Par exemple, un composant d'affichage peut se concentrer sur la façon dont il rend les données utilisateur sans avoir à se préoccuper de la manière dont ces données sont récupérées, mises à jour ou gérées, parce qu'il s'attend à recevoir un objet qui respecte l'interface `User`. C'est le rôle du ViewModel de fournir ces données en respectant l'interface définie.

Cela aide à maintenir la modularité et l'évolutivité de l'application, facilitant ainsi la maintenance et l'extension de l'application à long terme.

## Exemple

Dans notre application, nous avons défini une interface `User` et un type `UserRole` pour représenter les données de l'utilisateur.

L'interface `User` définit la structure des objets utilisateur dans notre application. Voici un exemple de sa définition :

```typescript
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

L'interface User décrit la forme que doit prendre un objet User dans notre application. Les propriétés marquées d'un ? sont optionnelles, ce qui signifie que lors de l'utilisation du modèle `User`, ces propriétés peuvent être omises. Cela nous obligera par ailleurs à traiter les cas où ces proprietés sont `null` ou `undefined` dans la réponse du backend.

Le type `UserRole` est un type discriminant, c'est-à-dire qu'il limite les valeurs possibles de la propriété role à `admin`, `Dba`, `User` ou `null`. Ceci ajoute une contrainte supplémentaire sur notre objet User, garantissant que la valeur de role ne peut être que l'une de ces quatre valeurs.

Concretement, cela signifie que si nous déclarons une variable `currentUser` de type `User` et que nous essayons d'accéder à une propriété non définie dans l'interface `User`, comme `currentUser.nom`, TypeScript nous signalera une erreur de compilation. C'est parce que nom n'est pas une propriété existante dans notre interface `User`.

Par exemple, si nous tentons d'écrire

```ts
let nom = currentUser.nom;
```

TypeScript réagira en disant quelque chose comme : `La propriété 'nom' n'existe pas sur le type 'User'`. Cela signifie que notre code ne sera pas compilé jusqu'à ce que nous corrigions cette erreur.

Cela garantit l'intégrité de nos données dans tout le codebase et prévient l'utilisation inappropriée ou erronée de nos objets `User`. Cette prévention proactive des erreurs est l'une des grandes forces de TypeScript.
