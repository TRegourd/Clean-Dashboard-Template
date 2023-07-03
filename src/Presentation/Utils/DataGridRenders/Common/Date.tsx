import dayjs from 'dayjs';

export default function DateRenderCell(data: string) {
	if (data) {
		return <span>{dayjs(data).format('YYYY-MM-DD HH:mm')}</span>;
	} else return <></>;
}
