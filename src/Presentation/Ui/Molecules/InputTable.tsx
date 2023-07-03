import { useState } from 'react';
import { Button } from '../Atoms/Button';
import TextInput from '../Atoms/TextInput';

export interface InputTableProps<T extends Record<string, string>>
	extends React.HTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
	form: T[];
	setForm: (value: React.SetStateAction<T[]>) => void;
	columns: string[];
	hasPasteArea?: boolean;
	pasteAreaLabel?: string;
}

export default function InputTable<T extends Record<string, string>>({
	columns,
	form,
	setForm,
	hasPasteArea,
	pasteAreaLabel,
}: InputTableProps<T>) {
	const [nbRow, setNbRow] = useState<number>(1);

	function handleTextAreaChange(event: React.ChangeEvent<HTMLInputElement>) {
		const pasteResult = tsvToJson(event.target.value);
		setForm(pasteResult);
		setNbRow(pasteResult.length);
	}

	function handleCellChange(
		event: React.ChangeEvent<HTMLInputElement>,
		rowIndex: number,
		column: string
	) {
		const value = event.target.value;
		setForm((prevForm: T[]) => {
			// make a shallow copy of the previous form state
			const newForm = [...prevForm];
			// update the corresponding property of the row object
			newForm[rowIndex] = {
				...newForm[rowIndex],
				[column]: value,
			};
			return newForm;
		});
	}

	return (
		<div className='overflow-x-auto flex flex-col items-center gap-2'>
			{hasPasteArea && (
				<TextInput
					type='textarea'
					handleChange={handleTextAreaChange}
					label={pasteAreaLabel}
				/>
			)}
			<table className='table w-[70vw]'>
				{/* head */}
				<thead>
					<tr>
						{columns.map((column, index) => {
							return <th key={index}>{column}</th>;
						})}
					</tr>
				</thead>
				<tbody>
					{/* generate an array of rows */}
					{Array.from({ length: nbRow }, (_, rowIndex) => (
						<tr key={rowIndex}>
							{/* map over the columns to render cells */}
							{columns.map((column, colIndex) => {
								// get the value of the corresponding property of the row object
								const value = form?.[rowIndex]?.[column];
								return (
									<td key={colIndex}>
										<TextInput
											type='text'
											defaultValue=''
											value={value}
											handleChange={(event) =>
												handleCellChange(event, rowIndex, column)
											}
										/>
									</td>
								);
							})}
						</tr>
					))}
				</tbody>
			</table>
			<div className='flex flew-row gap-1'>
				<Button
					className='btn btn-outline'
					onClick={() => {
						if (nbRow > 1) setNbRow(nbRow - 1);
					}}
				>
					<span>
						<i className='fa-solid fa-minus' />
					</span>
				</Button>
				<Button
					className='btn btn-outline'
					onClick={() => {
						setNbRow(nbRow + 1);
					}}
				>
					<span>
						<i className='fa-solid fa-plus' />
					</span>
				</Button>
			</div>
		</div>
	);
}

function tsvToJson(tsvText: string) {
	//Split all the text into seperate lines on new lines and carriage return feeds
	var allTextLines = tsvText.split(/\r\n|\n/);
	//Split per line on tabs and commas
	var headers = allTextLines[0].split(/\t|,/);
	var lines = [];

	for (var i = 1; i < allTextLines.length; i++) {
		var data = allTextLines[i].split(/\t|,/);

		if (data.length === headers.length) {
			var row: any = {};
			for (var j = 0; j < headers.length; j++) {
				row[headers[j]] = data[j];
			}
			lines.push(row);
		}
	}

	return JSON.parse(JSON.stringify(lines));
}
