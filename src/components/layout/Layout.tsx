import { ReactNode } from 'react'
import Navigation from './Navigation'

type Props = {
	children: ReactNode
}

function Layout(props: Props) {
	return (
		<>
			<Navigation />
			<main className='bg-darkBlue'>{props.children}</main>
		</>
	)
}

export default Layout
