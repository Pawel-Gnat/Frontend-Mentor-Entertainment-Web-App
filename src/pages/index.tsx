import Head from 'next/head'

export default function Home() {
	return (
		<>
			<Head>
				<title>Frontend Mentor Entertainment web app</title>
				<meta
					name='description'
					content='Frontend Mentor Entertainment web app'
				/>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1'
				/>
				<link
					rel='icon'
					href='/favicon.png'
				/>
			</Head>
			<main>
				<h1 className='text-3xl font-light underline'>Hello world!</h1>
			</main>
		</>
	)
}
