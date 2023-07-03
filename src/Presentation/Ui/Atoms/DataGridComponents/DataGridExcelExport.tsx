import { MenuItem } from '@mui/material';
import {
	GridApi,
	GridColumns,
	GridExportMenuItemProps,
	gridFilteredSortedRowIdsSelector,
	gridVisibleColumnFieldsSelector,
	useGridApiContext,
} from '@mui/x-data-grid';
import dayjs from 'dayjs';
import * as XLSX from 'xlsx';

function handleExport(apiRef: React.MutableRefObject<GridApi>) {
	const data = getExcelData(apiRef);
	const columns: GridColumns = apiRef.current.getVisibleColumns();
	const columnNames = columns.map((column) => column.headerName);

	const worksheet = XLSX.utils.json_to_sheet(data);
	XLSX.utils.sheet_add_aoa(worksheet, [[...columnNames]], {
		origin: 'A1',
	});

	const workbook = XLSX.utils.book_new();

	XLSX.utils.book_append_sheet(workbook, worksheet, 'Page 1');
	XLSX.writeFile(
		workbook,
		`Export Excel Portail BDD - ${dayjs().format('YYYY-MM-DD HH-mm')}.xlsx`,
		{ compression: false }
	);
}

function getExcelData(apiRef: React.MutableRefObject<GridApi>) {
	// Select rows and columns
	const filteredSortedRowIds = gridFilteredSortedRowIdsSelector(apiRef);
	const visibleColumnsField = gridVisibleColumnFieldsSelector(apiRef);

	// Format the data. Here we only keep the value
	const data = filteredSortedRowIds.map((id) => {
		const row: Record<string, any> = {};
		visibleColumnsField.forEach((field) => {
			row[field] = apiRef.current.getCellParams(id, field).value;
		});
		return row;
	});

	return data;
}

export default function DataGridExcelExport(
	props: GridExportMenuItemProps<{}>
) {
	const apiRef = useGridApiContext();

	const { hideMenu } = props;

	return (
		<MenuItem
			onClick={() => {
				handleExport(apiRef);

				// Hide the export menu after the export
				hideMenu?.();
			}}
		>
			Télécharger au format Excel
		</MenuItem>
	);
}
