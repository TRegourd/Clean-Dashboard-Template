import {
	GridToolbarColumnsButton,
	GridToolbarContainer,
	GridToolbarFilterButton,
} from '@mui/x-data-grid';
import ExportButton from '../../Molecules/DataGridComponents/DataGridExportButton';
import React from 'react';
import { useMemo } from 'react';

export default function DataGridToolbar({
	additionalButtons,
}: {
	additionalButtons?: JSX.Element[];
}) {
	return useMemo(() => {
		return (
			<GridToolbarContainer>
				<GridToolbarColumnsButton />
				<GridToolbarFilterButton />
				<ExportButton />
				{additionalButtons &&
					additionalButtons.map((button, index) => {
						return <React.Fragment key={index}>{button}</React.Fragment>;
					})}
			</GridToolbarContainer>
		);
	}, [additionalButtons]);
}
