import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';
import datalabels from 'chartjs-plugin-datalabels';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Legend,
	ChartOptions,
	TimeScale,
	Tooltip,
} from 'chart.js';
import { Button } from '../../Atoms/Button';
import TitleCard from '../TitleCard';
import Annotation from 'chartjs-plugin-annotation';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	TimeScale,
	Title,
	Legend,
	Tooltip,
	zoomPlugin,
	datalabels,
	Annotation
);

export interface BarChartProps {
	title?: string;
	data: BarChartDataProps;
	options: ChartOptions<'bar'>;
	zoomEnabled?: boolean;
	hideEnabled?: boolean;
}

export interface BarChartDataProps {
	labels: string[];
	datasets: {
		label?: string;
		data: (number | { x: any; y: number } | Date[] | string[])[];
		backgroundColor?: string[];
		borderColor?: string;
		borderWidth?: number;
		stack?: string;
		skipNull?: boolean;
		datalabels?: { formatter: () => void };
		barPercentage?: number;
		categortyPercentage?: number;
		barThickness?: number | 'flex';
	}[];
}

const BarChart = ({
	data,
	title,
	options,
	zoomEnabled = true,
	hideEnabled = true,
}: BarChartProps) => {
	const chartRef = React.useRef<ChartJS>(null);
	const [allDatasetsVisible, setAllDatasetsVisible] = useState(true);

	const handleResetZoom = () => {
		chartRef.current?.resetZoom();
	};

	const handleToggleDatasets = () => {
		if (chartRef.current) {
			chartRef.current.data.datasets.forEach((dataset) => {
				dataset.hidden = allDatasetsVisible; // hide all if currently visible, show all otherwise
			});

			chartRef.current.update(); // update the chart to reflect changes
		}

		setAllDatasetsVisible(!allDatasetsVisible);
	};

	return (
		<TitleCard cardTitle={title}>
			<div className='text-center m-auto h-full w-full'>
				<Bar ref={chartRef} data={data} options={options} />
				{zoomEnabled && (
					<Button onClick={handleResetZoom} className='btn-ghost'>
						Reset Zoom
					</Button>
				)}
				{hideEnabled && (
					<Button onClick={handleToggleDatasets} className='btn-ghost'>
						{allDatasetsVisible ? 'Hide All' : 'Show All'}
					</Button>
				)}
			</div>
		</TitleCard>
	);
};

export default BarChart;
