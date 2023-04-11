import { useEffect, useRef, useState } from 'react'

type SearchProps = {
	content: string
	placeholder: string
	onChange: (searchValue: string) => void
}

export const SearchInput = (props: SearchProps) => {
	const inputRef = useRef<HTMLInputElement>(null)

	function Search() {
		if (inputRef.current) {
			const searchValue = inputRef.current.value
			props.onChange(searchValue)
		}
	}

	return (
		<>
			<label
				htmlFor='searchbar'
				className='visually-hidden'>
				{props.content}
			</label>
			<input
				name='searchbar'
				type='text'
				className='text-input font-light grow pb-[0.5rem] border-b border-transparent bg-inherit text-pureWhite caret-lightRed focus:border-greyishBlue focus:outline-none placeholder:text-pureWhite placeholder:opacity-40 cursor-pointer'
				placeholder={props.placeholder}
				ref={inputRef}
				onChange={Search}
			/>
		</>
	)
}

type AuthProps = {
	content: string
	placeholder: string
	value: string
	onChange: (value: string) => void
	error: string
}

export const AuthInput = (props: AuthProps) => {
	const inputRef = useRef<HTMLInputElement>(null)
	const [error, setError] = useState(props.error)

	useEffect(() => {
		setError(props.error)
	}, [props.error])

	function handleInputChange() {
		if (inputRef.current) {
			const value = inputRef.current.value
			props.onChange(value)
		}
	}

	const errorClass = error ? 'border-lightRed' : ''

	return (
		<div className='relative'>
			<label
				htmlFor='searchbar'
				className='visually-hidden'>
				{props.content}
			</label>
			<input
				name='searchbar'
				type='text'
				className={`font-light w-full px-[1.6rem] pb-[1.8rem] border-b border-greyishBlue bg-inherit text-pureWhite caret-lightRed focus:border-pureWhite focus:outline-none placeholder:text-pureWhite placeholder:opacity-40 cursor-pointer ${errorClass}`}
				placeholder={props.placeholder}
				ref={inputRef}
				value={props.value}
				onChange={handleInputChange}
			/>
			{error ? <p className='text-[1.3rem] absolute top-[0.3rem] right-[1.6rem] text-lightRed'>{error}</p> : null}
		</div>
	)
}
