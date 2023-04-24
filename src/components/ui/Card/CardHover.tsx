import { PlayButton } from '../Button/Button'

type Props = {
	hover: boolean
	handlePlayButton: (notification: { message: string; status: string }) => void
}

export const CardHover = (props: Props) => {
	const hoverClass = props.hover ? 'opacity-100' : 'opacity-0'

	return (
		<div className={`${hoverClass} absolute inset-0 bg-black/50 transition-opacity`}>
			<PlayButton onClick={props.handlePlayButton} />
		</div>
	)
}
