import { MenuItem } from '@mui/material';
import {
	gridVisibleColumnFieldsSelector,
	GridRowModel,
	GridPrintExportMenuItemProps,
	GridColumns,
	useGridApiContext,
	GridApi,
	gridFilteredSortedRowIdsSelector,
} from '@mui/x-data-grid';
import dayjs from 'dayjs';

export default function DataGridPrint(props: GridPrintExportMenuItemProps) {
	const apiRef = useGridApiContext();

	const { hideMenu } = props;

	const handlePrint = () => {
		getJson(apiRef)
			.then((data) => {
				const content = generatePrintContent(data);
				const printWindow = window.open('', '_blank');
				printWindow?.document.write(content);
				printWindow?.document.close();
				printWindow?.print();
			})
			.catch((error) => {
				console.error('Error getting data', error);
			});
	};

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

		return Promise.resolve(data);
	};

	const generatePrintContent = (rows: GridRowModel[]) => {
		const visibleColumnsField = gridVisibleColumnFieldsSelector(apiRef);
		const columns: GridColumns = apiRef.current.getVisibleColumns();
		const tableHeader = `<thead style="background-color: #b4b4b4; color: white;"><tr>${visibleColumnsField
			.map(
				(field) =>
					`<th style="border: 1px solid black; padding: 5px;">${
						columns.find((col) => col.field === field)?.headerName
					}</th>`
			)
			.join('')}</tr></thead>`;
		const tableRows = rows.map((row, index) => {
			const cells = visibleColumnsField.map((field) => {
				const cellValue = row[field] !== undefined ? row[field] : '';

				return `<td style="border: 1px solid #ddd; padding: 5px;">${cellValue}</td>`;
			});
			return `<tr class="${index % 2 === 0 ? 'even' : 'odd'}">${cells.join(
				''
			)}</tr>`;
		});
		const table = `<table style="table-layout: auto; border-collapse: collapse; width: 100%;">${tableHeader}<tbody>${tableRows.join(
			''
		)}</tbody></table>`;
		return `<html><head><title>${`Impression Portail BDD - ${dayjs().format(
			'YYYY-MM-DD HH-mm'
		)}`}</title><style>.odd {background-color: #f9f9f9;}</style></head><body>${table}</body></html>`;
	};

	return (
		<MenuItem
			onClick={() => {
				handlePrint();
				hideMenu?.();
			}}
		>
			Impression
		</MenuItem>
	);
}
