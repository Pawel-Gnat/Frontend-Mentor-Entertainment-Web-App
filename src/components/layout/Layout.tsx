import Head from 'next/head'
import { ReactNode } from 'react'
import Navigation from './Navigation'

type Props = {
	children: ReactNode
}

function Layout(props: Props) {
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
			<Navigation />
			<main className='px-[1.6rem] bg-darkBlue'>{props.children}</main>
		</>
	)
}

export default Layout
