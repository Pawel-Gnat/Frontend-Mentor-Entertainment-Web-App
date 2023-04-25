import Image from 'next/image'
import { useState } from 'react'

type BookmarkedProps = {
	isBookmarked: boolean
	onClick: () => void
}

export const BookmarkButton = (props: BookmarkedProps) => {
	const [isHovering, setIsHovering] = useState(false)

	const handleMouseOver = () => {
		setIsHovering(true)
	}

	const handleMouseOut = () => {
		setIsHovering(false)
	}

	const hoverButtonClass = isHovering ? 'bg-pureWhite' : 'bg-darkBlue/50'
	const hoverImageClass = isHovering ? 'brightness-0' : ''

	return (
		<button
			type='button'
			className={`${props.isBookmarked ? 'bg-pureWhite' : hoverButtonClass} absolute top-[0.8rem] right-[0.8rem]
			h-[3.2rem] w-[3.2rem] p-[0.9rem] rounded-full z-10`}
			aria-label='Bookmark'
			onMouseOver={handleMouseOver}
			onMouseOut={handleMouseOut}
			onClick={props.onClick}>
			<Image
				src='/assets/icons/icon-bookmark-empty.svg'
				width={12}
				height={14}
				className={`${props.isBookmarked ? 'brightness-0' : hoverImageClass} h-full w-auto m-auto`}
				alt=''
				aria-hidden='true'
			/>
		</button>
	)
}
