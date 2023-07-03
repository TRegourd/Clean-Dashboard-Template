import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Hooks/AuthContext';
import { SearchContext } from '../../Hooks/SearchContext';
import { Avatar } from '../Atoms/Avatar';
import { Button } from '../Atoms/Button';
import DropdownMenu from '../Atoms/DropdownMenu';
import TextInput from '../Atoms/TextInput';

function Header() {
	const { searchValue, setSearchValue, handleSearch } =
		useContext(SearchContext);

	const { login, isLogged, disconnect } = useContext(AuthContext);

	const handleSearchChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setSearchValue(event.target.value);
	};

	const handleSubmit = (
		event: React.MouseEvent<HTMLElement> | React.FormEvent<HTMLElement>
	) => {
		event.preventDefault();
		handleSearch();
	};

	return (
		<>
			<div className='navbar  flex justify-between   z-10 bg-base-200'>
				{/* Menu toogle for mobile view or small screen */}
				<div className=''>
					<label
						htmlFor='left-sidebar-drawer'
						className='btn btn-primary drawer-button lg:hidden'
					>
						<i className='h-5 inline-block w-5 fa-solid fa-bars' />
					</label>
				</div>

				<form
					className='form-control flex flex-row gap-2 items-center mx-2'
					onSubmit={handleSubmit}
				>
					<TextInput
						type='text'
						placeholder='Base, Domaine, ...'
						defaultValue=''
						value={searchValue}
						handleChange={handleSearchChange}
					/>
					<Button type='submit' className='btn-primary' onClick={handleSubmit}>
						Recherche
					</Button>
				</form>

				<div className='order-last flex items-center gap-2'>
					<DropdownMenu
						buttonClassName='btn-outline btn-primary'
						hover={true}
						buttonLabel='More Actions'
						menus={[
							<a href='https://google.com' target={'_blank'} rel='noreferrer'>
								<div className='flex items-center gap-1'>
									<span>Google</span>
									<i className='fa-solid fa-arrow-up-right-from-square pl-1' />
								</div>
							</a>,
						]}
					/>
					{/* Profile icon, opening menu on click */}
					{isLogged && (
						<div className='dropdown dropdown-end'>
							<label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
								<Avatar image='/avatar.png' />
							</label>
							<ul
								tabIndex={0}
								className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52'
							>
								<li className='justify-between'>
									<Link to={'/app/profile'}>Profil</Link>
								</li>

								<div className='divider mt-0 mb-0'></div>
								<li>
									<Button className='btn-ghost' onClick={disconnect}>
										Logout
									</Button>
								</li>
							</ul>
						</div>
					)}
					{!isLogged && <Button onClick={login}>Login</Button>}
				</div>
			</div>
		</>
	);
}

export default Header;
