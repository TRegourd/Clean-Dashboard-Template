import { useContext, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AuthContext } from './Presentation/Hooks/AuthContext';
import Layout from './Presentation/Ui/Templates/Layout';
import LoginView from './Presentation/views/Login/LoginView';

function App() {
	const { checkAuth, checkUser } = useContext(AuthContext);

	const token = checkAuth();
	const location = useLocation();

	useEffect(() => {
		// Check the current only at page reload
		checkUser();
	}, []);

	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<LoginView />} />
				<Route
					// Navigates through the app if token found, else return to login page ("/")
					path='/app/*'
					element={
						token ? (
							<Layout />
						) : (
							<Navigate to={'/'} replace state={{ from: location }} />
						)
					}
				/>

				<Route
					// Navigates from the login page to the App if token found, else return to login page ("/")
					path='*'
					element={
						token ? (
							<Navigate to={'/app/home'} replace />
						) : (
							<Navigate to={'/'} replace state={{ from: location }} />
						)
					}
				/>
			</Routes>
		</div>
	);
}

export default App;
