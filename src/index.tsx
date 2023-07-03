import ReactDOM from 'react-dom/client';
import './Presentation/assets/scss/main.scss';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import SearchProvider from './Presentation/Hooks/SearchContext';
import LoginProvider from './Presentation/Hooks/AuthContext';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	// <React.StrictMode>
	<BrowserRouter>
		<LoginProvider>
			<SearchProvider>
				<App />
				<ToastContainer />
			</SearchProvider>
		</LoginProvider>
	</BrowserRouter>
	// </React.StrictMode>
);
