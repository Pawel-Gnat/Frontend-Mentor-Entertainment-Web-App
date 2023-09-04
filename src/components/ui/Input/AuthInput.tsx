import { useEffect, useRef, useState } from 'react'

type AuthProps = {
	content: string
	placeholder: string
	value: string
	onChange: (value: string) => void
	error: string
	type?: string
}

export const AuthInput = (props: AuthProps) => {
	const inputRef = useRef<HTMLInputElement>(null)
	const [error, setError] = useState(props.error)

	useEffect(() => {
		setError(props.error)
	}, [props.error])

	function handleInputChange() {
		if (inputRef.current) {
			const value = inputRef.current.value.trim()
			props.onChange(value)
		}
	}

	const textClass = 'text-[1.3rem] absolute top-[0.3rem] right-[1.6rem] '
	const errorClass = error ? 'border-lightRed' : ''

	return (
		<div className='relative'>
			<label
				htmlFor='auth'
				className='visually-hidden'>
				{props.content}
			</label>
			<input
				id='auth'
				name='auth'
				type={props.type === 'password' ? 'password' : 'text'}
				className={`font-light w-full px-[1.6rem] pb-[1.8rem] border-b border-greyishBlue bg-inherit text-pureWhite caret-lightRed focus:border-pureWhite focus:outline-none placeholder:text-pureWhite placeholder:opacity-40 cursor-pointer ${errorClass}`}
				placeholder={props.placeholder}
				ref={inputRef}
				value={props.value}
				onChange={handleInputChange}
			/>
			{error ? <p className={`${textClass} text-lightRed`}>{error}</p> : null}
		</div>
	)
}
