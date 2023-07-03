import { Button, ButtonProps } from '@mui/material';
import { memo } from 'react';

function DataGridVisibleButton(props: ButtonProps & { isActive?: boolean }) {
	const { isActive, ...rest } = props;

	return (
		<Button {...rest}>
			<i className={`fa-solid fa-eye${isActive ? '-slash' : ''} mr-2`} />
			{isActive ? 'Bases Visibles Uniquement' : 'Toutes les Bases'}
		</Button>
	);
}

export default memo(DataGridVisibleButton);
