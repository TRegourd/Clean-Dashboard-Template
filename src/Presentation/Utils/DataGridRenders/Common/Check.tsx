import { Tooltip } from '@mui/material';

export default function CheckRenderCell(
	condition: boolean | undefined,
	circle?: 'circle'
) {
	if (condition)
		return (
			<Tooltip title='true'>
				{circle ? (
					<i className='fa-solid fa-circle-check text-green-600' />
				) : (
					<i className='fa-solid fa-check text-green-600' />
				)}
			</Tooltip>
		);
	else
		return (
			<Tooltip title='false'>
				{circle ? (
					<i className='fa-solid fa-circle-xmark text-red-600' />
				) : (
					<i className='fa-solid fa-xmark text-red-600' />
				)}
			</Tooltip>
		);
}
