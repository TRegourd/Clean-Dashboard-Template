import { ChartOptions } from 'chart.js';

interface PieChartOptions {
	title?: string;
	hasTitle?: boolean;
	hasLegend?: boolean;
	hasLabel?: boolean;
	dataset: number[];
	legendPosition?: 'top' | 'bottom';
	padding?: {
		top: number;
		bottom: number;
		right: number;
		left: number;
	};
	labelOffset?: number;
}

export function PieChartChartOptions({
	title = '',
	hasTitle = true,
	hasLegend = true,
	hasLabel = false,
	legendPosition = 'bottom',
	dataset,
	padding = {
		top: 0,
		bottom: 0,
		right: 100,
		left: 100,
	},
	labelOffset = 20,
}: PieChartOptions): ChartOptions<'pie'> {
	return {
		responsive: true,
		layout: {
			padding: padding,
		},
		plugins: {
			title: {
				display: title ? hasTitle : false,
				text: title,
			},
			legend: {
				display: hasLegend,
				position: legendPosition,
			},
			tooltip: {
				callbacks: {
					label: function (context: any) {
						const value = context.parsed;
						const total = dataset
							.filter((value): value is number => typeof value === 'number')
							.reduce((acc: number, cur: number) => acc + cur, 0);
						const percentage =
							total !== 0 ? ((value / total) * 100).toFixed(2) + '%' : '0%';
						return context.label + ': ' + value + ' (' + percentage + ')';
					},
				},
			},
			datalabels: {
				display: function (context: any) {
					const value = context.dataset.data[context.dataIndex];
					const total = dataset
						.filter((value): value is number => typeof value === 'number')
						.reduce((acc: number, cur: number) => acc + cur, 0);
					const percentage = total !== 0 ? (value / total) * 100 : 0;
					return percentage >= 1;
				},
				formatter: (value: number, context: any) => {
					const label = context.chart.data.labels[context.dataIndex] as string;
					const total = dataset
						.filter((value): value is number => typeof value === 'number')
						.reduce((acc: number, cur: number) => acc + cur, 0);
					const percentage =
						total !== 0 ? ((value / total) * 100).toFixed(2) + '%' : '0%';
					return hasLabel
						? label + '\n' + value + ' (' + percentage + ')'
						: value + ' (' + percentage + ')';
				},

				color: '#000',
				backgroundColor: 'transparent',
				offset: labelOffset,
				anchor: 'end',
				align: 'end',
				clip: false,
			},
		},
	};
}
