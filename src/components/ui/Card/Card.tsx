import Image from 'next/image'
import { useState } from 'react'
import { CardHover } from './CardHover'
import { BookmarkButton } from '../Button/BookmarkButton'
import { Notification } from '../Notification/Notification'
import { BookmarkLoader } from '../Loader/BookmarkLoader'
import { NotificationType, CardsType } from '../../../types/types'
import { useNotification } from '../../../hooks/useNotification'
import { useBookmark } from '../../../hooks/useBookmark'

export const Card = (props: CardsType) => {
	const { year, category, rating, title, regular, bookmarked } = props
	const [isHovering, setIsHovering] = useState(false)
	const { notification, handleNotification } = useNotification()
	const { isBookmarked, isBookmarking, handleBookmark } = useBookmark({ title, bookmarked, handleNotification })

	const handleMouseOver = () => {
		setIsHovering(true)
	}

	const handleMouseOut = () => {
		setIsHovering(false)
	}

	const handlePlayButton = (notification: NotificationType) => {
		handleNotification(notification)
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

				<CardHover
					hover={isHovering}
					handlePlayButton={handlePlayButton}
				/>
			</div>

			{isBookmarking ? (
				<BookmarkLoader />
			) : (
				<BookmarkButton
					isBookmarked={isBookmarked}
					onClick={handleBookmark}
				/>
			)}

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
			{notification.active && (
				<Notification
					message={notification.message}
					status={notification.status}
				/>
			)}
		</div>
	)
}
