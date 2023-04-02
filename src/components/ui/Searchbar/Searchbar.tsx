import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

type Props = {
	placeholder: string
}

export const Searchbar = (props: Props) => {
	const [searchedTitle, setSearchedTitle] = useState('')
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		const debounce = setTimeout(() => {
			console.log(searchedTitle)
		}, 500)

		return () => clearTimeout(debounce)
	}, [searchedTitle])

	function Search() {
		if (inputRef.current) {
			setSearchedTitle(inputRef.current.value)
		}
	}

	return (
		<>
			<label
				htmlFor='searchbar'
				className='visually-hidden'>
				Searchbar
			</label>
			<div className='flex flex-row gap-[1.6rem] pt-[2.4rem] lg:gap-[2.4rem]'>
				<Image
					src='/assets/icons/icon-search.svg'
					width={24}
					height={24}
					className='pb-[0.5rem] m-auto aspect-square md:w-[32px]'
					alt=''
					aria-hidden='true'
				/>
				<input
					name='searchbar'
					type='text'
					className='text-input font-light grow pb-[0.5rem] border-b border-transparent bg-inherit text-pureWhite caret-lightRed focus:border-greyishBlue focus:outline-none placeholder:text-pureWhite placeholder:opacity-40 cursor-pointer'
					placeholder={props.placeholder}
					ref={inputRef}
					onChange={Search}
				/>
			</div>
		</>
	)
}
