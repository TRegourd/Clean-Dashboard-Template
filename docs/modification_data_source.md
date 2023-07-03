# Modification de la source de données dans notre application

Lors du développement d'une application, il peut être nécessaire de modifier la source des données utilisées. Cela peut impliquer de modifier un endpoint d'API ou de passer d'une source de données locales à une source de données distantes. Voici comment ces modifications peuvent être effectuées dans notre application.

## 1. Modification d'un endpoint

La première étape consiste à identifier l'endroit où l'endpoint est défini dans votre code. Dans notre application, les endpoints sont définis dans les classes de répertoire, qui implémentent des interfaces de répertoire spécifiques à un domaine.

Par exemple, prenons la classe `UserRepositoryImpl` :

```typescript
import { ServerApi } from '../config';
import { User } from '../../../Domain/Model/Users/User';
import { UserRepository } from '../../../Domain/Repository/Users/UserRepository';

export class UserRepositoryImpl implements UserRepository {
	async getUserById(id: string): Promise<User> {
		return ServerApi.get(`/user/profile/${id}`);
	}
	// ...
}
```

Ici, vous pouvez voir que l'endpoint pour obtenir un utilisateur par son id est défini comme
`/user/profile/${id}`. Si vous souhaitez modifier l'endpoint pour correspondre à un nouveau chemin, par exemple `/api/users/${id}`, vous pouvez simplement mettre à jour la ligne

```sh
return ServerApi.get(/user/profile/${id})
```

en

```sh
return ServerApi.get(/api/users/${id});
```

❗️Notez que lorsque vous modifiez un endpoint, vous devez vous assurer que la structure des données renvoyées par le backend correspond au modèle que vous attendez dans votre application. Dans cet exemple, le [modèle](model.md) attendu est `User` (voir couche Domaine).

## 2. Passage d'une source de données locales à une source de données distantes

Si une source de données locales est actuellement utilisée et que vous souhaitez passer à une source de données distantes, vous devrez modifier la façon dont vous obtenez vos données.

Voici un exemple de la façon dont nous pouvons obtenir des données locales dans notre application, à partir de la classe `InfoUsefulLinkRepositoryImpl` :

```typescript
import '../../LocalData/swagger_output.json';
import { Info } from '../../../Domain/Model/Infos/Info';
import { InfoUsefulLinkRepository } from '../../../Domain/Repository/Infos/InfoUsefulLinkRepository';

export class InfoUsefulLinkRepositoryImpl implements InfoUsefulLinkRepository {
	async getUsefulLinks(): Promise<Info[]> {
		return import('../../LocalData/usefulLinks.json')
			.then((res) => {
				return res.default;
			})
			.catch((err) => {
				console.log(err);
				return [];
			});
	}
}
```

Dans cette classe, les données sont obtenues à partir d'un fichier JSON local. Si vous voulez obtenir ces données à partir d'une API distante à la place, vous pouvez remplacer l'appel import par un appel `ServerApi.get('url de l'endpoint')`.

```typescript
import { ServerApi } from '../config';
import { Info } from '../../../Domain/Model/Infos/Info';
import { InfoUsefulLinkRepository } from '../../../Domain/Repository/Infos/InfoUsefulLinkRepository';

export class InfoUsefulLinkRepositoryImpl implements InfoUsefulLinkRepository {
	async getUsefulLinks(): Promise<Info[]> {
		return ServerApi.get('/info/endpoint_for_useful_links');
	}
}
```

De la même façon que pour la modification d'un endpoint, vous devez vous assurer que la structure des données renvoyées par l'API distante correspond à celle attendue par l'application, ici `Ìnfo` (voir couche Domaine).

## 3. ServerApi et changement/ajout de Backend

`ServerApi` est une instance personnalisée d'Axios,

Cette instance se trouve à la racine du dossier `src/Data/Repository` et supporte les méthodes suivantes :

- `get(url, options?)`
- `post(url, body?, options?)`
- `put(url, body?, options?)`
- `delete(url, options?)`

Ces méthodes accepte les paramètres suivants :

- `url : string` (obligatoire): L'URL de l'API à appeler.
- `body : any` (facultatif): Le corps de la requête à envoyer à l'API (non applicable pour les requêtes GET et DELETE).
- `options : AxiosRequestConfig` (facultatif): Options de configuration supplémentaires pour la requête Axios.

L'URL de base de l'API à laquelle `ServerApi` envoie des requêtes est déterminée par la variable d'environnement `REACT_APP_API_URL`.

Pour utiliser au autre backend (y compris en parallèle du premier) Il est possible de créer une autre instance de `Axios`, disons `OtherServerApi`, qui interagit avec un backend différent (une autre BASE_URL). L'important est que les données renvoyées par ce backend respectent également le modèle attendu par l'application.
