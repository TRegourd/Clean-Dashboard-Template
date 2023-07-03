# Structure du projet

Voici un aperçu de la structure du projet :

- `build` : Ce dossier contient les fichiers de production qui sont créés après avoir exécuté `npm run build`.
- `docs` : Ce dossier contient toute la documentation du projet, y compris ce fichier.
- `node_modules` : Ce dossier contient toutes les dépendances du projet qui sont installées via npm.
- `public` : Ce dossier contient toutes les ressources statiques utilisées dans l'application, comme les images.
- `src` : Ce dossier contient le code source de l'application. Nous allons le détailler plus loin.

## Dossier public

Le dossier `public` contient toutes les ressources statiques utilisées dans l'application. Cela comprend les images, les icônes et d'autres fichiers qui sont directement utilisés par l'application.

## Dossier src

Le dossier src est organisé selon une architecture hexagonale, qui est une méthode de structuration du code qui vise à rendre les composants de l'application modulables. Les responsabilités sont clairement définies entre différents dossiers et fichiers.

L'architecture hexagonale sépare le logiciel en trois principales parties : Data, Domain et Presentation.

### Dossier Data

Ce dossier est responsable de la gestion des données de l'application. Il contient les fichiers qui interagissent directement avec les [sources de données](modification_data_source.md), que ce soit une base de données, un service web ou même des fichiers locaux.

- `LocalData` : Contient les fichiers de configuration locaux tels que les fichiers .md ou .json, la configuration de l'API Swagger, les liens utiles ou la configuration de l'aide au choix ODS.
- `Repository` : Contient les fichiers [RepositoryImpl](repository_implementation.md) qui sont les implémentations des interfaces définies dans le dossier Domain/Repository. Ce sont les fichiers qui interagissent réellement avec les sources de données. Les repositories dépendent uniquement des modèles, et ne doivent pas être liés à des détails spécifiques de mise en œuvre tels que des bases de données spécifiques.

### Dossier Domain

Ce dossier est le cœur de l'architecture hexagonale. Il contient la logique métier de l'application, indépendamment de la présentation et des sources de données.

- `Model` : Contient les [modèles](model.md) de données utilisés par l'application. Les modèles n'ont des dépendances vers aucun autre élément de l'application, ils sont totalement indépendants.
- `Repository` : Contient les [interfaces](repository_interface.md) pour les repositories qui sont implémentées dans Data/Repository. Les repositories dépendent uniquement des modèles, et ne doivent pas être liés à des détails spécifiques de mise en œuvre tels que des bases de données spécifiques.
- `UseCase` : Contient les [cas d'utilisation](use_case.md) de l'application. Chaque cas d'utilisation représente une action ou un appel de données par une page. C'est ici que de la logique de traitement des données reçues du backend peut être implémentée, en accord avec le cas d'usage (exemple : un endpoint renvoie une liste brute, que je souhaite filtrer avant de la fournir aux composants d'affichage). Chaque Use Case dépend des modèles et des repositories, mais pas des détails spécifiques de l'interface utilisateur ou des sources de données.

### Dossier Presentation

Ce dossier contient tout ce qui est lié à la présentation de l'application à l'utilisateur. C'est ici que se trouvent les composants React, les hooks, les styles, etc. Cette couche dépend des Use Cases et des modèles, mais pas des détails spécifiques de la mise en œuvre des sources de données.

- `assets` : Contient les fichiers scss pour le style de l'application et les webfonts.
- `hooks` : Contient les hooks personnalisés et les hooks de contexte de l'application.
- `routes` : Contient les routes pour le routeur de l'application et la configuration de la barre latérale.
- `Ui` : Contient les composants d'affichage organisés selon la méthodologie [atomic design](atomic_design.md).
- `Utils` : Contient diverses fonctions utilitaires.
- `views` : Contient les pages de l'application. Chaque page est organisés selon le modèle [Model-View-ViewModel (MVVM)](mvvm.md) et peut faire appel à des "conteneurs" qui eux mêmes peuvent utiliser des "components" afin de strucutrer les composants d'affichage.

Cette structure assure que chaque partie de l'application a des responsabilités clairement définies et peut être développée, testée et modifiée indépendamment des autres. Cela facilite la maintenance de l'application à long terme et rend le code plus facile à comprendre pour les nouveaux développeurs.
