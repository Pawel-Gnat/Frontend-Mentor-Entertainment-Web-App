import Image from 'next/image'
import { useState } from 'react'

export const BookmarkButton = () => {
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
			className={`${hoverButtonClass} absolute top-[0.8rem] right-[0.8rem]
        h-[3.2rem] w-[3.2rem] p-[0.9rem] rounded-full bg-darkBlue/50 z-10`}
			aria-label='Bookmark'
			onMouseOver={handleMouseOver}
			onMouseOut={handleMouseOut}>
			<Image
				src='/assets/icons/icon-bookmark-empty.svg'
				width={12}
				height={14}
				className={`${hoverImageClass} h-full w-auto m-auto`}
				alt=''
				aria-hidden='true'
			/>
		</button>
	)
}
