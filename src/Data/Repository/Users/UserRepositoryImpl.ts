import { ServerApi } from '../config';
import { User } from '../../../Domain/Model/Users/User';
import { UserRepository } from '../../../Domain/Repository/Users/UserRepository';

export class UserRepositoryImpl implements UserRepository {
	async getUserById(id: string): Promise<User> {
		return ServerApi.get(`/user/profile/${id}`);
	}
	async getUserList(): Promise<User[]> {
		// Fetching local data for template demo
		return import('../../LocalData/listOfUsers.example.json')
			.then((res) => {
				return res.default as User[];
			})
			.catch((err) => {
				console.log(err);
				return [];
			});
	}

	async updateUserById({
		id,
		body,
	}: {
		id: string;
		body: User;
	}): Promise<void> {
		return ServerApi.post(`/user/profile/${id}`, body);
	}

	async deleteUserById(id: string): Promise<void> {
		return ServerApi.delete(`/user/profile/${id}`);
	}
}
