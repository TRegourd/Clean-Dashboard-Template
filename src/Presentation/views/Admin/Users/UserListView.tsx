import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../../../Domain/Model/Users/User';
import { RouteParams } from '../../../routes';
import { Button } from '../../../Ui/Atoms/Button';
import DataGrid from '../../../Ui/Atoms/DataGrid';
import { DataGridColsProps } from '../../../Ui/Atoms/DataGrid';
import Hero from '../../../Ui/Molecules/Hero';
import UserListViewModel from './UserListViewModel';
import CheckRenderCell from '../../../Utils/DataGridRenders/Common/Check';
import DateRenderCell from '../../../Utils/DataGridRenders/Common/Date';

function UserListView({ name }: RouteParams) {
	const { usersList, getUsersList } = UserListViewModel();

	useEffect(() => {
		getUsersList();
	}, []);

	const columns: DataGridColsProps[] = [
		{
			field: 'username',
			headerName: `UserName`,
			width: 200,
		},
		{ field: 'email', headerName: 'Email', width: 300 },
		{ field: 'role', headerName: 'Rôle', width: 200 },
		{
			field: 'lastLogin',
			headerName: 'Dernière Connexion',
			width: 200,
			renderCell: (cellValues: { row: User }) => {
				const lastLogin = cellValues.row.lastLogin;
				return lastLogin ? DateRenderCell(lastLogin) : <></>;
			},
		},
		{
			field: 'newsletter',
			headerName: 'News',
			width: 100,
			renderCell: (cellValues: { row: User }) => {
				return CheckRenderCell(cellValues.row.newsletter);
			},
		},
		{
			field: 'edit',
			headerName: 'Edit',
			width: 100,
			renderCell: (cellValues: { row: User }) => {
				return (
					<Link to={`/app/profile/update/${cellValues.row._id}`}>
						<Button className='btn btn-ghost text-orange-400'>
							<i className='fa-solid fa-pen'></i>
						</Button>
					</Link>
				);
			},
		},
	];

	return (
		<>
			<Hero title={name ? name : ''} />

			<div className='h-[75vh] w-full'>
				<DataGrid data={usersList} columns={columns} />
			</div>
		</>
	);
}

export default UserListView;
