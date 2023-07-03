import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Hooks/AuthContext';
import { RouteParams } from '../../../routes';
import { Button } from '../../../Ui/Atoms/Button';

import Hero from '../../../Ui/Molecules/Hero';
import TitleCard from '../../../Ui/Molecules/TitleCard';

export default function UserProfileView({ name }: RouteParams) {
	const { currentUser } = useContext(AuthContext);

	return currentUser ? (
		<>
			<Hero title={name} />
			<TitleCard>
				<div className=' flex flex-col gap-2 content-center '>
					<div className='input-container bg-gray-50 rounded p-2 mb-4'>
						<span className='input-label font-bold text-left block'>
							<i className='fa-solid fa-user fa-xl pr-2' />
							Identifiant
						</span>
						<div className='input-value text-sm text-left'>
							{currentUser.username}
						</div>
					</div>
					<div className='input-container bg-gray-50 rounded p-2 mb-4'>
						<span className='input-label font-bold text-left block'>
							<i className='fa-solid fa-envelope fa-xl pr-2' />
							Email
						</span>
						<div className='input-value text-sm text-left'>
							{currentUser.email}
						</div>
					</div>
					<div className='input-container bg-gray-50 rounded p-2 mb-4'>
						<span className='input-label font-bold text-left block'>
							<i className='fa-solid fa-users-rectangle fa-xl pr-2' />
							Role
						</span>
						<div className='input-value text-sm text-left'>
							{currentUser.role || ''}
						</div>
					</div>
					<div className='input-container bg-gray-50 rounded p-2 mb-4'>
						<span className='input-label font-bold text-left block'>
							<i className='fa-solid fa-newspaper fa-xl pr-2' />
							Newsletter
						</span>
						<div className='input-value text-sm text-left'>
							{currentUser?.newsletter
								? 'Abonné à la newsletter'
								: 'Non abonné à la newsletter'}
						</div>
					</div>

					<Link to={`/app/profile/update/${currentUser._id}`}>
						<Button className='m-1'>
							<i className='fa-solid fa-pen mr-2' /> Editer le profil
						</Button>
					</Link>
				</div>
			</TitleCard>
		</>
	) : (
		<Hero title={name} />
	);
}
