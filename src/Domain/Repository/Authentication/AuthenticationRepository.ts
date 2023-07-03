import { User } from './../../Model/Users/User';

export interface AuthenticationRepository {
	getToken(body: Object): Promise<string>;
	getUserInfo(): Promise<{ user: User; token: string }>;
}
