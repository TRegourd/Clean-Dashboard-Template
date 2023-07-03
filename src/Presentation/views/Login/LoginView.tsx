import React, { useContext } from 'react';
import { AuthContext } from '../../Hooks/AuthContext';
import { Button } from '../../Ui/Atoms/Button';

export default function LoginView() {
	const { login } = useContext(AuthContext);
	return (
		<div className='min-h-screen bg-base-200 flex items-center'>
			<div className='card mx-auto w-full max-w-5xl  shadow-xl'>
				<div className='  bg-base-100 rounded-xl'>
					<div className='hero min-h-full rounded-l-xl bg-base-200'>
						<div className='hero-content py-12'>
							<div className='max-w-md flex flex-col items-center gap-4'>
								<h1 className='text-3xl text-center flex flex-col items-center font-bold '>
									<img
										className=' w-10'
										src='/logo.png'
										alt='BDD Portal Logo'
									/>
									<span>Portail BDD</span>
								</h1>

								<Button className='btn-primary' onClick={login}>
									Connexion avec SSO
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
