import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html lang='en'>
			<Head />
			<body className='bg-darkBlue md:p-[2.4rem] lg:p-[3.2rem]'>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
