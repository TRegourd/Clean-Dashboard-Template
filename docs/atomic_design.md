# Atomic Design dans l'application

L'interface utilisateur de cette application est construite en suivant la méthodologie Atomic Design. Cette approche permet de construire des interfaces utilisateur robustes et cohérentes en organisant les composants en atomes, molécules, organismes et templates.

❗️ Les composants UI sont conçus pour être indépendants et réutilisables autant que possible. Ils ont peu ou pas de dépendances directes avec le reste de l'application, à l'exception de quelques librairies comme Material-UI, Chart.js ou Day.js. Cette séparation assure que chaque composant UI peut être développé, testé et maintenu de manière indépendante.

## Atomes (atoms)

Les atomes sont les unités de base de l'interface utilisateur. Ils représentent les blocs de construction les plus élémentaires de notre design, comme les boutons, les titres, les inputs ou les labels.

## Molécules (molecules)

Les molécules sont des groupes d'atomes qui fonctionnent ensemble comme une unité. Par exemple, un formulaire de recherche peut être considéré comme une molécule : il comprend un champ de saisie (un atome) et un bouton (un autre atome).

## Organismes (organisms)

Les organismes sont des groupes de molécules (et éventuellement d'atomes) qui forment une partie distincte de l'interface utilisateur.

## Templates

Les templates sont des groupes d'organismes qui forment une page typique de l'application, mais sans les données spécifiques.

En construisant l'interface utilisateur à partir de ces éléments de base, on peut assurer la cohérence à travers tout le design de l'application. Cela rend également le code plus modulaire et plus facile à maintenir, car ces composants peuvent être réutilisés dans différentes parties de l'application.
