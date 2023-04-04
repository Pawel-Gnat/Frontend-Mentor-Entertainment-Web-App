import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { SearchInput } from '../Input/Input'

type Props = {
	placeholder: string
	onSearch: (filterResults: string) => void
}

export const Searchbar = ({ placeholder, onSearch }: Props) => {
	const [searchedTitle, setSearchedTitle] = useState('')

	useEffect(() => {
		const debounce = setTimeout(() => {
			onSearch(searchedTitle)
		}, 500)

		console.log(searchedTitle)
		return () => clearTimeout(debounce)
	}, [searchedTitle, onSearch])

	function handleSearch(searchValue: string) {
		setSearchedTitle(searchValue)
	}

	return (
		<>
			<div className='flex flex-row gap-[1.6rem] pt-[2.4rem] lg:gap-[2.4rem]'>
				<Image
					src='/assets/icons/icon-search.svg'
					width={24}
					height={24}
					className='pb-[0.5rem] m-auto aspect-square md:w-[32px]'
					alt=''
					aria-hidden='true'
				/>
				<SearchInput
					content='Searchbar'
					placeholder={placeholder}
					onChange={handleSearch}
				/>
			</div>
		</>
	)
}
