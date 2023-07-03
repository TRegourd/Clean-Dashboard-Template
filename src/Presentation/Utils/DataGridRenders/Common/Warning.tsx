import { Tooltip } from '@mui/material';

export default function WarningRenderCell(condition: boolean | undefined) {
	if (condition)
		return (
			<Tooltip title='true'>
				<i className='fa-solid fa-triangle-exclamation text-yellow-600' />
			</Tooltip>
		);
	else
		return (
			<Tooltip title='false'>
				<></>
			</Tooltip>
		);
}
