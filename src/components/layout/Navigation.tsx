import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

function Navigation() {
	const router = useRouter()
	const currentRoute = router.pathname

	const nonActivePath =
		'aspect-square md:h-[2rem] md:w-[2rem] hover:invert-[50] hover:sepia-[.35] hover:saturate-[8000] hover:hue-rotate-[330deg]'
	const activePath = 'aspect-square md:h-[2rem] md:w-[2rem]' + ' invert-80 brightness-[150] saturate-0'

	return (
		<header className='flex flex-row place-items-center justify-between p-[1.6rem] bg-semiDarkBlue md:p-[2.4rem] md:m-[2.4rem] md:rounded-[1rem] xl:fixed xl:flex-col xl:h-[95vh] xl:p-[3.2rem] xl:m-[3.2rem]'>
			<Image
				src='/assets/logo.svg'
				width={25}
				height={20}
				className='w-[25px] h-[20px] md:h-[2.6rem] md:w-[3.2rem]'
				alt=''
				aria-hidden='true'
			/>
			<nav>
				<ul className='flex flex-row place-items-center gap-[2.4rem] xl:flex-col'>
					<li>
						<Link href='/'>
							<Image
								src='/assets/icons/icon-nav-home.svg'
								width={16}
								height={16}
								className={currentRoute === '/' ? activePath : nonActivePath}
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
								className={currentRoute === '/movies' ? activePath : nonActivePath}
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
								className={currentRoute === '/tv-series' ? activePath : nonActivePath}
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
								className={currentRoute === '/bookmarked' ? activePath : nonActivePath}
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
					className='aspect-square md:h-[3.2rem] md:w-[3.2rem] md:h-[4rem] md:w-[4rem]'
					alt='Logged in user page'
				/>
			</Link>
		</header>
	)
}

export default Navigation
