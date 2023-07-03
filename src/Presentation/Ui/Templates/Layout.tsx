import { useState, useEffect, useRef } from 'react';
import { Button } from '../Atoms/Button';

import LeftSidebar from '../Organisms/LeftSideBar';
import PageContent from '../Organisms/PageContent';

function Layout() {
	const [showBackToTopButton, setShowBackToTopButton] = useState(false);
	const pageContentRef = useRef<HTMLDivElement>(null);

	function handleScroll() {
		const mainContent = pageContentRef.current;
		if (mainContent) {
			if (mainContent.scrollTop > 500) {
				setShowBackToTopButton(true);
			} else {
				setShowBackToTopButton(false);
			}
		}
	}

	function handleClickBackTop() {
		const mainContent = pageContentRef.current;
		if (mainContent) mainContent.scrollTo({ top: 0, behavior: 'smooth' });
	}

	useEffect(() => {
		const mainContent = pageContentRef.current;
		if (mainContent)
			mainContent.onscroll = function () {
				handleScroll();
			};
	}, []);

	return (
		<>
			<div className='drawer drawer-mobile'>
				<input
					id='left-sidebar-drawer'
					type='checkbox'
					className='drawer-toggle'
				/>
				<PageContent pageContentRef={pageContentRef} />

				<LeftSidebar />
			</div>

			{showBackToTopButton && (
				<Button
					className='back-to-top-button absolute right-0 bottom-10'
					id='back-to-top'
					onClick={handleClickBackTop}
				>
					<i className='fa-solid fa-arrow-up' />
				</Button>
			)}
		</>
	);
}

export default Layout;
