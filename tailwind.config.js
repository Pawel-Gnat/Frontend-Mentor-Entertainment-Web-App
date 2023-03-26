/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				lightRed: 'hsl(0, 97%, 63%)',
				darkBlue: 'hsl(223, 30%, 9%)',
				greyishBlue: 'hsl(223, 23%, 46%)',
				semiDarkBlue: 'hsl(223, 36%, 14%)',
				pureWhite: 'hsl(0, 0%, 100%)',
			},
		},
	},
	plugins: [],
}
