import Image from 'next/image'
import { NotificationType } from '../../../types/types'

type PlayButtonProps = {
	onClick: (props: NotificationType) => void
}

export const PlayButton = (props: PlayButtonProps) => {
	const playHandler = () => {
		props.onClick({ message: 'Play function is not implemented', status: 'error' })
	}

	return (
		<button
			type='button'
			aria-label='Play'
			className='text-[1.8rem] font-light relative left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] flex flex-row gap-[1.9rem] p-[0.9rem] pr-[2.4rem] rounded-full bg-pureWhite/25 text-pureWhite md:hover:bg-semiDarkBlue transition-colors'
			onClick={playHandler}>
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
