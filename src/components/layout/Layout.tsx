import { ReactNode } from 'react'
import Navigation from './Navigation'
import Head from 'next/head'
import { useRouter } from 'next/router'

type Props = {
	children: ReactNode
}

function Layout(props: Props) {
	const router = useRouter()

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

			{router.pathname === '/auth' ? null : <Navigation />}

			<main className='pl-[1.6rem] md:pl-[2.4rem] xl:pl-[3.6rem] xl:py-[4rem] xl:ml-[13.6rem]'>{props.children}</main>
		</>
	)
}

export default Layout
