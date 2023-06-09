import Image from 'next/image'
import { useState } from 'react'
import { CardHover } from './CardHover'
import { BookmarkButton } from '../Button/BookmarkButton'
import { Notification } from '../Notification/Notification'
import { BookmarkLoader } from '../Loader/BookmarkLoader'
import { NotificationType, TrendingCardsType } from '../../../types/types'
import { useNotification } from '../../../hooks/useNotification'
import { useBookmark } from '../../../hooks/useBookmark'

export const TrendingCard = (props: TrendingCardsType) => {
	const { year, category, rating, title, trending, bookmarked } = props
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
				className='relative w-full h-[14rem] rounded-[0.8rem] overflow-hidden md:h-[23rem] xl:h-[27rem]'
				onMouseOver={handleMouseOver}
				onMouseOut={handleMouseOut}>
				{trending && (
					<>
						<Image
							src={trending.small}
							fill
							className='w-full object-cover lg:hidden'
							alt={title}
							sizes='auto'
						/>
						<Image
							src={trending.large}
							fill
							className='hidden w-full object-cover lg:inline-flex'
							alt={title}
							sizes='auto'
						/>
					</>
				)}

				<div className='absolute bottom-[1.6rem] left-[1.6rem]'>
					<div className='flex gap-[0.8rem] text-trending-text font-light text-pureWhite mt-[0.8rem] opacity-75 '>
						<span className='cursor-default'>{year}</span>
						&bull;
						<Image
							src={
								category === 'Movies' ? '/assets/icons/icon-category-movie.svg' : '/assets/icons/icon-category-tv.svg'
							}
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
			{notification.active && (
				<Notification
					message={notification.message}
					status={notification.status}
				/>
			)}
		</div>
	)
}
