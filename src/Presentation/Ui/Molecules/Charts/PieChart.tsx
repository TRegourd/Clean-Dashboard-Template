import React from 'react';
import {
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	Legend,
	ChartOptions,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import TitleCard from '../TitleCard';
import datalabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, datalabels);

export interface PieChartProps {
	title?: string;
	data: PieChartDataProps;
	options: ChartOptions<'pie'>;
}

export interface PieChartDataProps {
	labels: string[];
	datasets: {
		label?: string;
		data: number[];
		backgroundColor?: string[];
		borderColor?: string;
		borderWidth?: number;
		offset?: number;
	}[];
}

const PieChart = ({ data, title, options }: PieChartProps) => {
	const chartRef = React.useRef<ChartJS>(null);

	return (
		<TitleCard cardTitle={title}>
			<div className='text-center m-auto '>
				<Pie data={data} options={options} ref={chartRef} />
			</div>
		</TitleCard>
	);
};

export default PieChart;
