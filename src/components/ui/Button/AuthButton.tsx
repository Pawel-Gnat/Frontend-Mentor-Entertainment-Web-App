import { AuthLoader } from '../Loader/AuthLoader'

type AuthProps = {
	isLoading?: boolean
	content: string
	onClick?: () => void
}

export const AuthButton = (props: AuthProps) => {
	return (
		<button
			className='font-outfit text-[1.5rem] font-light text-pureWhite w-full h-[5.5rem] p-[1.5rem] mt-[1.6rem] rounded-[0.6rem] bg-lightRed transition-colors duration-300 md:hover:bg-pureWhite md:hover:text-darkBlue'
			onClick={props.onClick}>
			{props.isLoading ? <AuthLoader /> : `${props.content}`}
		</button>
	)
}
