import { useRef } from 'react'

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
	// onChange: (searchValue: string) => void
}

export const AuthInput = (props: AuthProps) => {
	const inputRef = useRef<HTMLInputElement>(null)

	// function Search() {
	// 	if (inputRef.current) {
	// 		const searchValue = inputRef.current.value
	// 		props.onChange(searchValue)
	// 	}
	// }

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
				className='font-light w-full px-[1.6rem] pb-[1.8rem] border-b border-greyishBlue bg-inherit text-pureWhite caret-lightRed focus:border-pureWhite focus:outline-none placeholder:text-pureWhite placeholder:opacity-40 cursor-pointer'
				placeholder={props.placeholder}
				ref={inputRef}
				// onChange={Search}
			/>
		</>
	)
}
