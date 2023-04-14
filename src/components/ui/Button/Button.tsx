import Image from 'next/image'
import { useState } from 'react'
import { AuthLoader } from '../Loader/AuthLoader'

export const PlayButton = () => {
	return (
		<button
			type='button'
			aria-label='Play'
			className='text-[1.8rem] font-light relative left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] flex flex-row gap-[1.9rem] p-[0.9rem] pr-[2.4rem] rounded-full bg-pureWhite/25 text-pureWhite'>
			<Image
				src='/assets/icons/icon-play.svg'
				width={30}
				height={30}
				className=''
				alt=''
				aria-hidden='true'
			/>
			Play
		</button>
	)
}

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

type Props = {
	isLoading?: boolean
	content: string
	onClick?: () => void
}

export const AuthButton = (props: Props) => {
	return (
		<button
			className='font-outfit text-[1.5rem] font-light text-pureWhite w-full h-[5.5rem] p-[1.5rem] mt-[1.6rem] rounded-[0.6rem] bg-lightRed transition-colors duration-300 md:hover:bg-pureWhite md:hover:text-darkBlue'
			onClick={props.onClick}>
			{props.isLoading ? <AuthLoader /> : `${props.content}`}
		</button>
	)
}
