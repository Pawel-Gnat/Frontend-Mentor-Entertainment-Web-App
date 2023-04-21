import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html lang='en'>
			<Head />
			<body className='bg-darkBlue'>
				<Main />
				<NextScript />
				<div id='notifications'></div>
			</body>
		</Html>
	)
}
