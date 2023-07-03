import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserRepositoryImpl } from './../../../../Data/Repository/Users/UserRepositoryImpl';
import { User } from './../../../../Domain/Model/Users/User';

import { useContext, useState } from 'react';

import { UpdateUserByIdUseCase } from '../../../../Domain/UseCase/Users/UpdateUserById';
import { DeleteUserByIdUseCase } from '../../../../Domain/UseCase/Users/DeleteUserById';
import { AuthContext } from '../../../Hooks/AuthContext';

export default function EditUserViewModel() {
	const [user, setUser] = useState<User>();
	const [form, setForm] = useState<User>({
		username: '',
		email: '',
		role: undefined,
		newsletter: false,
	});

	const navigate = useNavigate();
	const { getCurrentUser, currentUser } = useContext(AuthContext);

	// const GetUseCase = new GetUserByIdUseCase(new UserRepositoryImpl());
	const EditUseCase = new UpdateUserByIdUseCase(new UserRepositoryImpl());
	const DeleteUseCase = new DeleteUserByIdUseCase(new UserRepositoryImpl());

	async function getUser(id: string) {
		try {
			// const result = await GetUseCase.invoke(id);
			setUser(currentUser);
			setForm(
				currentUser || {
					email: 'john@example.com',
					username: 'jonDoe',
					role: 'admin',
				}
			);
		} catch (err) {
			throw err;
		}
	}

	async function editUser(id: string) {
		try {
			await EditUseCase.invoke({ id: id, body: form });
			getUser(id);
			toast.success('Utilisateur mis à jour');
			setForm({
				username: '',
				email: '',
				role: null,
			});
			getCurrentUser();
			navigate(-1);
		} catch (err) {
			toast.error('Erreur pendant la mise à jour');
			throw err;
		}
	}

	async function deleteUser(id: string) {
		if (
			window.confirm(
				`Cela va supprimer l'utilisateur de manière définitve, êtes vous sûr ?`
			)
		) {
			try {
				await DeleteUseCase.invoke(id);
				toast.success('Utilisateur supprimé');
				navigate(-1);
			} catch (err) {
				toast.error('Erreur pendant la suppression');
				throw err;
			}
		}
	}

	return {
		form,
		setForm,
		getUser,
		editUser,
		deleteUser,
		user,
	};
}
