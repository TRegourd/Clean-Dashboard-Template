import { ButtonProps } from '@mui/material';
import {
	GridCsvExportMenuItem,
	GridToolbarExportContainer,
} from '@mui/x-data-grid';
import dayjs from 'dayjs';
import DataGridJsonExport from '../../Atoms/DataGridComponents/DataGridJsonExport';

import DataGridPrint from '../../Atoms/DataGridComponents/DataGridPrint';
import DataGridExcelExport from '../../Atoms/DataGridComponents/DataGridExcelExport';

export default function DataGridExportButton(props: ButtonProps) {
	return (
		<GridToolbarExportContainer {...props}>
			<GridCsvExportMenuItem
				options={{
					fileName: `Export CSV Portail BDD - ${dayjs().format(
						'YYYY-MM-DD HH-mm'
					)}`,
				}}
			/>
			<DataGridExcelExport />
			<DataGridJsonExport />
			<DataGridPrint />
		</GridToolbarExportContainer>
	);
}
