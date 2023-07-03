import { UserRepositoryImpl } from '../../../../Data/Repository/Users/UserRepositoryImpl';
import { User } from '../../../../Domain/Model/Users/User';
import { useState } from 'react';
import { GetUserListUseCase } from '../../../../Domain/UseCase/Users/GetUserList';
export default function UserListViewModel() {
	const [usersList, setUsersList] = useState<User[]>([]);

	const getListUseCase = new GetUserListUseCase(new UserRepositoryImpl());

	async function getUsersList() {
		try {
			const result = await getListUseCase.invoke();
			setUsersList(result);
		} catch (err) {
			throw err;
		}
	}

	return {
		getUsersList,
		usersList,
	};
}
