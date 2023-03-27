import Link from 'next/link'
import Image from 'next/image'

function Navigation() {
	return (
		<header className='flex flex-row place-items-center justify-between p-[1.6rem] bg-semiDarkBlue'>
			<Image
				src='/assets/logo.svg'
				width={25}
				height={20}
				className='w-[25px] h-[20px]'
				alt=''
				aria-hidden='true'
			/>
			<nav>
				<ul className='flex flex-row place-items-center gap-[2.4rem]'>
					<li>
						<Link href='/'>
							<Image
								src='/assets/icons/icon-nav-home.svg'
								width={16}
								height={16}
								className='aspect-square'
								alt='Home page'
							/>
						</Link>
					</li>
					<li>
						<Link href='/movies'>
							<Image
								src='/assets/icons/icon-nav-movies.svg'
								width={16}
								height={16}
								className='aspect-square'
								alt='Movies page'
							/>
						</Link>
					</li>
					<li>
						<Link href='/tv-series'>
							<Image
								src='/assets/icons/icon-nav-tv-series.svg'
								width={16}
								height={16}
								className='aspect-square'
								alt='TV series page'
							/>
						</Link>
					</li>
					<li>
						<Link href='/bookmarked'>
							<Image
								src='/assets/icons/icon-nav-bookmark.svg'
								width={16}
								height={16}
								className='aspect-square'
								alt='Bookmarked page'
							/>
						</Link>
					</li>
				</ul>
			</nav>
			<Link href='/profile'>
				<Image
					src='/assets/user/image-avatar.png'
					width={24}
					height={24}
					className='aspect-square'
					alt='Logged in user page'
				/>
			</Link>
		</header>
	)
}

export default Navigation
