import Image from 'next/image'
import { useState } from 'react'
import { CardHover } from './CardHover'
import { BookmarkButton } from '../Button/Button'
import { handleBookmarks } from '../../../lib/data-utils'

type Props = {
	title: string
	year: number
	category: string
	rating: string
	trending?: {
		small: string
		large: string
	}
	bookmarked: boolean
}

export const TrendingCard = (props: Props) => {
	const { year, category, rating, title, trending, bookmarked } = props
	const [isHovering, setIsHovering] = useState(false)
	const [isBookmarked, setIsBookmarked] = useState(bookmarked)

	const handleMouseOver = () => {
		setIsHovering(true)
	}

	const handleMouseOut = () => {
		setIsHovering(false)
	}

	const handleBookmark = async () => {
		const userBookmarks = await handleBookmarks()

		if (!userBookmarks) return

		if (userBookmarks.includes(title)) {
			const result = await handleBookmarks('DELETE', title)
			console.log(result)
		} else {
			const result = await handleBookmarks('POST', title)
			console.log(result)
		}

		setIsBookmarked(prev => !prev)
	}

	return (
		<div
			className='relative w-full h-[14rem] rounded-[0.8rem] overflow-hidden md:h-[23rem] xl:h-[27rem]'
			onMouseOver={handleMouseOver}
			onMouseOut={handleMouseOut}>
			{trending ? (
				<>
					<Image
						src={trending.small}
						fill
						className='w-full object-cover lg:hidden'
						alt={title}
					/>
					<Image
						src={trending.large}
						fill
						className='hidden w-full object-cover lg:inline-flex'
						alt={title}
					/>
				</>
			) : null}

			<div className='absolute bottom-[1.6rem] left-[1.6rem]'>
				<div className='flex gap-[0.8rem] text-trending-text font-light text-pureWhite mt-[0.8rem] opacity-75 '>
					<span className='cursor-default'>{year}</span>
					&bull;
					<Image
						src={category === 'Movies' ? '/assets/icons/icon-category-movie.svg' : '/assets/icons/icon-category-tv.svg'}
						width={12}
						height={12}
						className='aspect-square my-auto'
						alt=''
						aria-hidden='true'
					/>
					<span className='cursor-default'>{category}</span>
					&bull;<span className='cursor-default'>{rating}</span>
				</div>
				<strong className='text-trending-title font-medium text-pureWhite cursor-default'>{title}</strong>
			</div>

			<CardHover hover={isHovering} />
			<BookmarkButton
				isBookmarked={isBookmarked}
				onClick={handleBookmark}
			/>
		</div>
	)
}
