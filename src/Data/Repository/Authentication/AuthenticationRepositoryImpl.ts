import { User } from './../../../Domain/Model/Users/User';
import { AuthenticationRepository } from './../../../Domain/Repository/Authentication/AuthenticationRepository';

//import { ServerApi } from './../config';

export class AuthenticationRepositoryImpl implements AuthenticationRepository {
	getToken(body: Object): Promise<string> {
		// Returning fake jwt for template demo
		return Promise.resolve('jwtToken');
	}
	getUserInfo(): Promise<{ user: User; token: string }> {
		// Fetching local data for template demo
		return import('../../LocalData/getUserInfoResponse.example.json')
			.then((res) => {
				return res.default as { user: User; token: string };
			})
			.catch((err) => {
				console.log(err);
				throw err;
			});
	}
}
