import { createPortal } from 'react-dom'

type Message = {
	message: string
	status: string
}

export const Notification = (props: Message) => {
	const { message, status } = props

	const backgroundColor = status === 'success' ? 'bg-greyishBlue' : 'bg-lightRed'

	return createPortal(
		<div
			className={`text-card-title fixed top-[12rem] right-[2.4rem] p-[1.5rem] rounded-[0.8rem] ${backgroundColor} z-10 animate-notification`}>
			<p>{message}</p>
		</div>,
		document.getElementById('notifications') as HTMLElement
	)
}
