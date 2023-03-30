/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		screens: {
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1440px',
		},
		extend: {
			colors: {
				lightRed: 'hsl(0, 97%, 63%)',
				darkBlue: 'hsl(223, 30%, 9%)',
				greyishBlue: 'hsl(223, 23%, 46%)',
				semiDarkBlue: 'hsl(223, 36%, 14%)',
				pureWhite: 'hsl(0, 0%, 100%)',
			},
			fontSize: {
				heading: 'clamp(2rem, 3vw, 3.2rem)',
				input: 'clamp(1.6rem, 3vw, 2.4rem)',
				'trending-title': 'clamp(1.5rem, 3vw, 2.4rem)',
				'trending-text': 'clamp(1.2rem, 3vw, 1.5rem)',
				'card-title': 'clamp(1.4rem, 3vw, 1.8rem)',
				'card-text': 'clamp(1.1rem, 3vw, 1.3rem)',
			},
			gridTemplateColumns: {
				main: 'auto, 1fr',
				'cards-mobile': 'repeat(auto-fill, minmax(16.4rem, 1fr))',
				'cards-tablet': 'repeat(auto-fill, minmax(22rem, 1fr))',
				'cards-desktop': 'repeat(auto-fill, minmax(28rem, 1fr))',
			},
		},
	},
	plugins: [],
}
