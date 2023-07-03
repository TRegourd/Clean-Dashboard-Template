# Gestion des données locales dans l'application

Dans l'application, certaines parties de l'interface utilisateur, comme les cartes "Liens Utiles", "API" et les questions du choix ODS, ainsi que la configuration du Swagger, sont alimentées par des fichiers JSON locaux situés dans le répertoire `src/Data/LocalData`.

Ces fichiers JSON sont ensuite importés et utilisés dans les différents composants de l'application pour alimenter les données affichées à l'utilisateur sur le principe "une entrée dans le tableau = une carte affichée dans l'application".

L'application utilise également des fichiers markdown pour afficher certains textes d'information comme la migration des bases Oracles ou la cartographie.

Il est important de noter que même si ces données sont actuellement fournies localement, elles pourraient également provenir d'une source distante, comme une API ou une base de données. Pour savoir comment faire ce changement, vous pouvez consulter le guide [Remplacer une source de données locale par une source de données distante](/docs/modification_data_source.md).
