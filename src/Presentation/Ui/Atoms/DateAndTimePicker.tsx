import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/fr';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export interface DatePickerProps {
	name: string;
	label: string;
	updateValue: (value: any) => void;
	defaultValue?: Dayjs;
	value?: Dayjs;
	type: 'dateAndTime' | 'date';
}

export default function DateAndTimePicker({
	name,
	label,
	value,
	updateValue,
	defaultValue,
	type,
}: DatePickerProps) {
	const handleChange = (newValue: Dayjs | null) => {
		if (dayjs(newValue).isValid()) {
			updateValue(newValue);
			value = dayjs(newValue);
		}
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='fr'>
			{type === 'dateAndTime' && (
				<DateTimePicker
					label={label}
					value={value || defaultValue}
					onChange={handleChange}
					renderInput={(params) => <TextField {...params} />}
				/>
			)}
			{type === 'date' && (
				<DatePicker
					label={label}
					value={value || defaultValue}
					onChange={handleChange}
					renderInput={(params) => <TextField {...params} />}
				/>
			)}
		</LocalizationProvider>
	);
}
