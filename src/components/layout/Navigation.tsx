import Link from 'next/link'
import Image from 'next/image'

function Navigation() {
	return (
		<header className='flex flex-row place-items-center justify-between m-[1.6rem]'>
			<Image
				src='./assets/logo.svg'
				width={25}
				height={20}
				alt=''
				aria-hidden='true'
			/>
			<nav>
				<ul className='flex flex-row'>
					<li>
						<Link href='/'>Home</Link>
					</li>
					<li>
						<Link href='/movies'>Movies</Link>
					</li>
					<li>
						<Link href='/tv-series'>TV Series</Link>
					</li>
					<li>
						<Link href='/bookmarked'>Bookmarked</Link>
					</li>
				</ul>
			</nav>
			<Link href='/profile'>Profile</Link>
		</header>
	)
}

export default Navigation
