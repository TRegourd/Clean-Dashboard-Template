import { User } from '../../Model/Users/User';

export interface UserRepository {
	getUserList(): Promise<User[]>;
	getUserById(id: string): Promise<User>;
	updateUserById({ id, body }: { id: string; body: User }): Promise<void>;
	deleteUserById(id: string): Promise<void>;
}
