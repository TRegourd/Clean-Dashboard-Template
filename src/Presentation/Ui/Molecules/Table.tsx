import React from 'react';
import TitleCard from './TitleCard';

export interface TableProps {
	config: TableConfigProps[];
	title?: string;
	data: { [key: string]: any };
}

export interface TableConfigProps {
	field: string;
	headerName: string;
	baseURL?: string;
	renderRow?: (rowValue: any) => JSX.Element;
}

export function GetTableRows(
	config: TableConfigProps[],
	data: { [key: string]: any }
): React.ReactNode {
	return config
		.filter((configEntry) => {
			return (
				Object.keys(data).includes(configEntry.field) || configEntry.renderRow
			);
		})
		.map((configEntry, index) => {
			if (configEntry.renderRow) {
				return (
					configEntry.renderRow(data[configEntry.field]).props.children && (
						<tr key={index}>
							<th>{configEntry.headerName}</th>
							<td>{configEntry.renderRow(data[configEntry.field])}</td>
						</tr>
					)
				);
			} else
				return (
					<tr key={index}>
						<th>{configEntry.headerName}</th>
						<td>{data[configEntry.field]}</td>
					</tr>
				);
		});
}

function Table({ title, data, config }: TableProps) {
	if (data)
		return (
			<TitleCard cardTitle={title}>
				<div className='overflow-x-auto'>
					<table className='table table-zebra w-full'>
						{/* <!-- head --> */}
						<thead>
							{/* <tr>
								<th>Propiété</th>
								<th>Valeur</th>
							</tr> */}
						</thead>
						<tbody>{GetTableRows(config, data)}</tbody>
					</table>
				</div>
			</TitleCard>
		);
	else return <></>;
}

export default Table;
