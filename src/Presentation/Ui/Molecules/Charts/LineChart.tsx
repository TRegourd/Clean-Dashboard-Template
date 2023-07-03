import React, { useState } from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler,
	ChartOptions,
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { Line } from 'react-chartjs-2';

import TitleCard from '../TitleCard';
import { Button } from '../../Atoms/Button';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Filler,
	Tooltip,
	Legend,
	zoomPlugin
);

export interface LineChartProps {
	title?: string;
	data: LineChartDataProps;
	options: ChartOptions<'line'>;
	zoomEnabled?: boolean;
	hideEnabled?: boolean;
}

export interface LineChartDataProps {
	labels: string[];
	datasets: {
		label?: string;
		data: (number | { x: string | number; y: number })[];
		backgroundColor?: string[];
		borderColor?: string[];
		borderWidth?: number;
		fill?: boolean;
		pointRadius?: number;
	}[];
}

function LineChart({
	data,
	title,
	options,
	zoomEnabled = true,
	hideEnabled = true,
}: LineChartProps) {
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
			<div className={'text-center'}>
				<Line ref={chartRef} options={options} data={data} />

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
}
export default LineChart;
