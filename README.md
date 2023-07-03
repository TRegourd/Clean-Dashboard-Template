# Portail BDD - Template de Dashboard React en architecture MVVM

Ce repository contient le front-end REACT du Portail BDD.

## Docs

- [STRUCTURE](docs/_STRUCTURE.md) - Structure du repository.

### Concepts Génériques

- [Atomic Design](docs/atomic_design.md) - Explication de l'Atomic Design pour les composants d'UI.
- [Modèles](docs/model.md) - Détail des modèles de données dans la couche Domaine.
- [Use Cases](use_case.md) - Détail des use cases (cas d'utilisation) dans la couche Domaine.
- [Interface des Repositories](repository_interface.md) - Détail de l'interface d'un repository dans la couche Domaine.
- [Implémentation des Repositories](docs/repository_implementation.md) - Détail de l'implémentation d'un repository dans la couche Data.
- [Model-View-ViewModel (MVVM)](docs/mvvm.md) - Explication de l'oganisation MVVM des pages de la courche Presentation.

### Guides

- [Gestion des données locales](docs/local_data.md) - Comment sont utilisés les fichiers locaux pour l'affichage de certaines vues de l'application.
- [Modification de la source de données](docs/modification_data_source.md) - Comment modifier la source de données (backend) de l'application.
- [Ajout d'une vue](docs/view_creation.md) - Comment ajouter une vue à l'application.
- [Ajout d'une colonne à une datagrid](docs/add_datagrid_column.md) - Comment ajouter une colonne à une datagrid.

---

## Prérequis

Pour commencer, assurez-vous d'avoir les outils suivants installés sur votre système :

- [Node.js](https://nodejs.org/en/) (version 16.14.2 utilisée pour le développement de l'application).
- [npm](https://www.npmjs.com/get-npm) (généralement installé avec Node.js).

## Installation

1. Clonez ce repository sur votre machine locale :

   ```sh
   git clone https://url_du_repository
   ```

2. Allez dans le répertoire du projet.

   ```sh
   cd reactbdd
   ```

3. Installez toutes les dépendances du projet.

   ```sh
   npm install
   ```

   Cette commande va installer toutes les dépendances nécessaires listées dans le fichier `package.json`.

## Lancer l'application

Une fois que toutes les dépendances sont installées, vous pouvez démarrer l'application avec la commande

```sh
npm install
```

Cette commande lance l'application en mode développement. Ouvrez [http://localhost:3000](http://localhost:3000) pour la voir dans le navigateur.

La page sera rechargée si vous faites des modifications. Vous verrez également les erreurs de lint dans la console.

## Configuration des variables d'environnement

Le projet utilise des variables d'environnement pour configurer certains aspects de l'application. Vous pouvez trouver un exemple de fichier de configuration d'environnement à la racine du répertoire : `.env.example`.

Pour créer votre propre fichier `.env`, copiez le fichier `.env.example` et renommez-le en `.env`. Ensuite, vous pouvez remplir vos informations comme ceci :

```env
REACT_APP_ENV = "environnement de travail (=dev pour localhost)"
REACT_APP_API_URL = "URL de base du backend" (exemple http://localhost:1234)
REACT_APP_AUTH_BASE_URI = "URL de base du fournisseur d'authentification"
REACT_APP_AUTH_CLIENT_ID = "ID client pour OAuth2"
REACT_APP_AUTH_REDIRECT_URI = "URL de redirection pour OAuth2"
REACT_APP_AUTH_SCOPES = "scopes pour OAuth2"
REACT_APP_VERSION = $npm_package_version
GENERATE_SOURCEMAP = false
```

Notez que `$npm_package_version` est une variable qui sera remplie automatiquement par npm depuis la version actuelle de votre package. Elle permet d'afficher dans le front-end la version actuelle de l'application. La version du `package.json` est donc à incrémenter lors du déploiment du nouvelle version.

❗️❗️ Assurez-vous de ne jamais pousser votre fichier `.env` personnel dans le repository pour éviter de partager les clefs de configuration.
