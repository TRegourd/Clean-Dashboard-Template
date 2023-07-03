import { MenuItem } from '@mui/material';
import {
	GridApi,
	GridExportMenuItemProps,
	gridFilteredSortedRowIdsSelector,
	gridVisibleColumnFieldsSelector,
	useGridApiContext,
} from '@mui/x-data-grid';
import dayjs from 'dayjs';

const getJson = (apiRef: React.MutableRefObject<GridApi>) => {
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

	// Stringify with some indentation
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#parameters
	return JSON.stringify(data, null, 2);
};

const exportBlob = (blob: Blob, filename: string) => {
	// Save the blob in a json file
	const url = URL.createObjectURL(blob);

	const a = document.createElement('a');
	a.href = url;
	a.download = filename;
	a.click();

	setTimeout(() => {
		URL.revokeObjectURL(url);
	});
};

export default function DataGridJsonExport(props: GridExportMenuItemProps<{}>) {
	const apiRef = useGridApiContext();

	const { hideMenu } = props;

	return (
		<MenuItem
			onClick={() => {
				const jsonString = getJson(apiRef);
				const blob = new Blob([jsonString], {
					type: 'text/json',
				});
				exportBlob(
					blob,
					`Export JSON Portail BDD - ${dayjs().format('YYYY-MM-DD HH-mm')}`
				);

				// Hide the export menu after the export
				hideMenu?.();
			}}
		>
			Télécharger au format JSON
		</MenuItem>
	);
}
