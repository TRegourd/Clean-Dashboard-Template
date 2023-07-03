import {
	DataGrid as MuiDataGrid,
	frFR,
	GridCellParams,
	GridRowParams,
} from '@mui/x-data-grid';
import { useState } from 'react';
import DataGridToolbar from '../Organisms/DataGridComponents/DataGridToolbar';

export interface DataGridColsProps {
	field: string;
	headerName: string;
	width?: number;
	flex?: number;
	minWidth?: number;
	renderCell?: (cellValues: GridCellParams) => JSX.Element;
	hide?: boolean;
	filter?: boolean;
	valueGetter?: (value: any) => React.ReactNode;
}

export default function DataGrid({
	data,
	columns,
	getRowClassName,
	additionalToolBarButton,
}: {
	data: any[];
	columns: DataGridColsProps[];
	isLogged?: boolean;
	getRowClassName?: (params: GridRowParams) => string;
	additionalToolBarButton?: JSX.Element[];
}) {
	const [pageSize, setPageSize] = useState<number>(50);
	let rows = [];

	const MyCustomNoRowsOverlay = () => (
		<div className='h-1/6 flex items-center justify-center'>
			<i className='fa-solid fa-database fa-2xl pr-2' />
			<span>Pas de données à afficher</span>
		</div>
	);
	const NoFilterResultOverlay = () => (
		<div className='h-1/6 flex items-center justify-center'>
			<i className='fa-solid fa-ban fa-2xl pr-2' />
			<span>Pas de résultats à afficher</span>
		</div>
	);

	if (data.length) {
		rows = data.map((row, index) => {
			return {
				...row,
				indexId: index,
			};
		});
	}

	if (columns && rows)
		return (
			<MuiDataGrid
				sx={{}}
				rows={rows}
				columns={columns}
				pageSize={pageSize}
				rowsPerPageOptions={[10, 50, 100]}
				onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
				pagination
				components={{
					Toolbar: () => (
						<DataGridToolbar additionalButtons={additionalToolBarButton} />
					),
					NoRowsOverlay: MyCustomNoRowsOverlay,
					NoResultsOverlay: NoFilterResultOverlay,
				}}
				getRowHeight={() => 'auto'}
				localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
				getRowId={(row) => row.indexId}
				getRowClassName={getRowClassName}
				disableSelectionOnClick
			/>
		);
	else {
		return <></>;
	}
}
