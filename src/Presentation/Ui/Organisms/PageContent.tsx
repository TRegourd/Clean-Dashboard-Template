import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../Molecules/Header';
import routes from '../../routes';
import NotFound from '../../views/NotFound';
import { AuthContext } from '../../Hooks/AuthContext';

interface PageContentProps {
	pageContentRef: React.RefObject<HTMLDivElement>;
}

function withTitle<P extends {}>(
	Component: React.FunctionComponent<P>,
	title: string,
	props: P
) {
	return function () {
		document.title = `${title} | Portail BDD`;
		return <Component {...props} />;
	};
}

const PageContent = React.memo(({ pageContentRef }: PageContentProps) => {
	const { userRole } = useContext(AuthContext);

	return (
		<div className='drawer-content flex flex-col '>
			<Header />
			<main
				className='flex-1 overflow-y-auto pt-2 px-6 pb-4'
				ref={pageContentRef}
			>
				<Routes>
					{routes.map((route, key) => {
						const Component = withTitle(route.component, route.name, {
							name: route.name,
						});

						if (route.adminRoute) {
							return (
								userRole === 'admin' && (
									<Route
										key={key}
										path={`${route.path}`}
										element={<Component />}
									/>
								)
							);
						} else
							return (
								<Route
									key={key}
									path={`${route.path}`}
									element={<Component />}
								/>
							);
					})}
					<Route path='*' element={<NotFound />} />
				</Routes>
			</main>
		</div>
	);
});

export default PageContent;
