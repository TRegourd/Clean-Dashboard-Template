import { createContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { User, UserRole } from '../../Domain/Model/Users/User';
import dayjs, { Dayjs } from 'dayjs';
import { AuthenticationRepositoryImpl } from '../../Data/Repository/Authentication/AuthenticationRepositoryImpl';
import { GetTokenUseCase } from '../../Domain/UseCase/Authentication/GetToken';
import { GetUserInfoUseCase } from '../../Domain/UseCase/Authentication/GetUserInfo';

export interface AuthContextProps {
	currentUser?: User;
	getCurrentUser: () => void;
	login: () => void;
	disconnect: () => void;
	isLogged: boolean;
	userRole: UserRole;
	checkAuth: () => string | undefined | null;
	checkUser: () => void;
}

const defaultValue: AuthContextProps = {
	checkAuth: () => '',
	checkUser: () => {},
	currentUser: undefined,
	login: () => {},
	disconnect: () => {},
	isLogged: false,
	userRole: null,
	getCurrentUser: () => {},
};

export const AuthContext = createContext<AuthContextProps>(defaultValue);

export default function LoginProvider({ children }: any) {
	const [isLogged, setIsLogged] = useState<boolean>(false);
	const [userRole, setUserRole] = useState<UserRole>(null);
	const [currentUser, setCurrentUser] = useState<User>();
	const [lastActivityTime, setLastActivityTime] = useState<Dayjs>(dayjs());

	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const location = useLocation();

	const TokenUseCase = new GetTokenUseCase(new AuthenticationRepositoryImpl());
	const UserInfoUseCase = new GetUserInfoUseCase(
		new AuthenticationRepositoryImpl()
	);

	const code = searchParams.get('code');
	const env = process.env.REACT_APP_ENV;
	const base_uri = process.env.REACT_APP_AUTH_BASE_URI;
	const redirect_uri = process.env.REACT_APP_AUTH_REDIRECT_URI;
	const client_id = process.env.REACT_APP_AUTH_CLIENT_ID;
	const scopes = process.env.REACT_APP_AUTH_SCOPES;

	async function getToken(code: string) {
		const token = await TokenUseCase.invoke({ code, redirect_uri });
		return token;
	}

	async function getCurrentUser() {
		const result = await UserInfoUseCase.invoke();
		const user = result?.user;
		const updatedToken = result?.token;

		if (user && updatedToken) {
			setCurrentUser(user);
			setUserRole(user.role ? user.role : null);
			setIsLogged(true);
			localStorage.setItem('jwt', updatedToken);
		} else disconnect();
	}

	function login() {
		if (env === 'dev') {
			window.location.href = `http://localhost:3000?code=code`;
		} else {
			window.location.href = `${base_uri}/authorize?client_id=${client_id}&realm=/agent&response_type=code&scope=${scopes}&redirect_uri=${redirect_uri}`;
		}
	}

	function disconnect() {
		setCurrentUser(undefined);
		setUserRole(null);
		setIsLogged(false);
		localStorage.removeItem('jwt');
		toast.warning('Deconnecté');
	}

	function checkAuth() {
		const jwToken = localStorage.getItem('jwt');

		if (!jwToken) {
			return;
		}
		return jwToken;
	}

	function checkUser() {
		const jwToken = checkAuth();
		jwToken && getCurrentUser();
	}

	useEffect(() => {
		// UseEffect called each time the useLocation state is updated, after a forced navigation to login page because missing or expried auth)
		location.state?.from?.pathname &&
			localStorage.setItem('prevLocation', location.state.from.pathname);
	}, [location.state?.from?.pathname]);

	useEffect(() => {
		// UseEffect called each time there is a return code in the search params (ie : the auth2 url callback returns an access code)
		async function loginWithAccessCode(code: string) {
			try {
				toast.info('Connexion...');
				const token = await getToken(code);
				localStorage.setItem('jwt', token);
				const prevLocation = localStorage.getItem('prevLocation');
				prevLocation ? navigate(`${prevLocation}`) : navigate('/app/home');
				localStorage.removeItem('prevLocation');
				toast.success('Connecté!');
				getCurrentUser();
			} catch (error) {
				toast.error('Problème de connexion...');
				throw error;
			}
		}
		if (code) {
			loginWithAccessCode(code);
		}
	}, [code]);

	useEffect(() => {
		// UseEffect called on each navigation inside the single page app
		const jwToken = checkAuth();
		if (window.location.pathname.includes('/app/')) {
			!jwToken && disconnect();
			dayjs().isAfter(lastActivityTime.add(1, 'hour')) && disconnect();
			dayjs().isBefore(lastActivityTime.add(1, 'hour')) &&
				setLastActivityTime(dayjs());
		}
	}, [window.location.pathname, isLogged]);

	const value = useMemo(
		() => ({
			checkAuth,
			currentUser,
			getCurrentUser,
			login,
			disconnect,
			isLogged,
			userRole,
			checkUser,
		}),
		[currentUser, userRole, isLogged]
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
