import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserRole } from '../../../../Domain/Model/Users/User';
import { AuthContext } from '../../../Hooks/AuthContext';
import { RouteParams } from '../../../routes';
import { Button } from '../../../Ui/Atoms/Button';
import Select from '../../../Ui/Atoms/Select';
import TextInput from '../../../Ui/Atoms/TextInput';
import EditUserViewModel from './EditUserViewModel';
import CheckBox from '../../../Ui/Atoms/CheckBox';

export default function EditUserView({ name }: RouteParams) {
	const { user, getUser, form, setForm, editUser, deleteUser } =
		EditUserViewModel();
	const { userRole } = useContext(AuthContext);
	const navigate = useNavigate();

	const params = useParams();

	const updateForm = (key: string, value: string | boolean) => {
		setForm({ ...form, [key]: value });
	};

	const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = event.target;
		if (type === 'checkbox') {
			updateForm(name, checked);
		} else {
			updateForm(name, value);
		}
	};

	async function handleClick() {
		const { role } = form;
		if (role && params.id) editUser(params.id);
		else {
			toast.error('Merci de renseigner tous les champs');
		}
	}

	useEffect(() => {
		params.id && getUser(params.id);
	}, [params]);

	return user ? (
		<div className=' flex flex-col w-full  gap-4'>
			<div
				className='btn-group w-full justify-center
			'
			>
				<Button className='btn btn-secondary' onClick={() => navigate(-1)}>
					<i className='mr-2 fa-solid fa-arrow-left '></i>
					<span>Retour</span>
				</Button>

				<Button className='btn-primary' onClick={handleClick}>
					Valider
				</Button>
			</div>

			<div
				className='form-control flex flex-col gap-2 content-center '
				onChange={handleFormChange}
			>
				<TextInput
					type='text'
					name='username'
					defaultValue={user.username}
					value={form?.username}
					handleChange={handleFormChange}
					label={
						<span>
							<i className='fa-solid fa-user fa-xl pr-2' />
							Identifiant Pôle Emploi
						</span>
					}
					disabled
				/>
				<TextInput
					type='text'
					name='email'
					defaultValue={user.email}
					value={form?.email}
					handleChange={handleFormChange}
					label={
						<span>
							<i className='fa-solid fa-envelope fa-xl pr-2' />
							Email
						</span>
					}
					disabled
				/>
				{!isDisabled(userRole) && (
					<Select
						name='role'
						placeholder='Pas de rôle attribué'
						defaultValue={user.role || 'PLACEHOLDER'}
						value={form?.role || ''}
						handleChange={handleFormChange}
						labelTitle={
							<span>
								<i className='fa-solid fa-users-rectangle fa-xl pr-2' />
								Role
							</span>
						}
						options={[
							{
								name: 'admin',
								value: 'admin',
								disabled: isDisabled(userRole),
							},
							{
								name: 'Dba',
								value: 'Dba',
								disabled: isDisabled(userRole),
							},
							{
								name: 'User',
								value: 'User',
								disabled: isDisabled(userRole),
							},
						]}
					></Select>
				)}

				<CheckBox
					name='newsletter'
					label='Je souhaite recevoir la newsletter'
					defaultChecked={form.newsletter || false}
					handleChange={handleFormChange}
				/>

				<Button className='btn-primary' onClick={handleClick}>
					Valider
				</Button>
			</div>

			{!isDisabled(userRole) && (
				<Button
					className='btn btn-error mt-8 w-full'
					onClick={() => params.id && deleteUser(params.id)}
				>
					<span>Supprimer</span>
					<i className='ml-2 fa-solid fa-trash '></i>
				</Button>
			)}
		</div>
	) : (
		<></>
	);
}

function isDisabled(role: UserRole) {
	return role !== 'admin';
}
