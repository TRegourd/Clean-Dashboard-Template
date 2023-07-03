import { useLocation } from 'react-router-dom';

export const usePageLocationForGraphOptions = () => {
	const location = useLocation();
	const isHomePage = location.pathname === '/app/home';

	const zoomEnabled = !isHomePage;
	const hideEndabled = !isHomePage;
	const hasTitle = isHomePage;
	const hasLegend = !isHomePage;

	return {
		zoomEnabled,
		hideEndabled,
		hasTitle,
		hasLegend,
	};
};
