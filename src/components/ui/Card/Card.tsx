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
	regular: {
		small: string
		medium: string
		large: string
	}
	bookmarked: boolean
}

export const Card = (props: Props) => {
	const { year, category, rating, title, regular, bookmarked } = props
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
		<div className='relative'>
			<div
				className='relative w-full rounded-[0.8rem] overflow-hidden'
				onMouseOver={handleMouseOver}
				onMouseOut={handleMouseOut}
				tabIndex={1}
				role={category}
				aria-label={title}>
				<Image
					src={regular.small}
					width={164}
					height={110}
					className='w-full md:hidden'
					alt={title}
				/>
				<Image
					src={regular.medium}
					width={164}
					height={110}
					className='hidden w-full md:inline-flex lg:hidden'
					alt={title}
				/>
				<Image
					src={regular.large}
					width={164}
					height={110}
					className='hidden w-full lg:inline-flex'
					alt={title}
				/>

				<CardHover hover={isHovering} />
				<BookmarkButton
					isBookmarked={isBookmarked}
					onClick={handleBookmark}
				/>
			</div>

			<div className='flex gap-[0.5rem] text-card-text font-light text-pureWhite mt-[0.8rem] opacity-75 '>
				<span className='cursor-default'>{year}</span>
				&bull;
				<Image
					src={category === 'Movies' ? '/assets/icons/icon-category-movie.svg' : '/assets/icons/icon-category-tv.svg'}
					width={10}
					height={10}
					className='aspect-square my-auto'
					alt=''
					aria-hidden='true'
				/>
				<span className='cursor-default'>{category}</span>
				&bull;<span className='cursor-default'>{rating}</span>
			</div>
			<strong className='text-card-title font-medium text-pureWhite cursor-default'>{title}</strong>
		</div>
	)
}
