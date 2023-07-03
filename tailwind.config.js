/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {},
	},
	plugins: [require('@tailwindcss/typography'), require('daisyui')],
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#054484',
					secondary: '#92C0DD',
					accent: '#f2a304',
					neutral: '#2D2D39',
					'base-100': '#FFFFFF',
					info: '#53B0EA',
					success: '#25A287',
					warning: '#F4C652',
					error: '#E66E56',
				},
			},
		],
	},
};
