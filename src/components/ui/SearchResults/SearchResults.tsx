import { getBookmarkedShows, getfilteredData, modifiedData } from '../../../lib/data-utils'
import { CardsList } from '../Card/CardsList'
import { Loader } from '../Loader/Loader'
import { Heading } from '../Text/Heading'
import { useEffect, useState } from 'react'

type Props = {
	result: string
	bookmarks?: boolean
}

type Shows = {
	title: string
	thumbnail: {
		trending?: {
			small: string
			large: string
		}
		regular: {
			small: string
			medium: string
			large: string
		}
	}
	year: number
	category: string
	rating: string
	isTrending: boolean
	isBookmarked: boolean
}

export const SearchResults = (props: Props) => {
	const [shows, setShows] = useState<Shows[]>([])
	const [isSearching, setIsSearching] = useState(false)
	const resultsNumber = shows.length
	let resultText = ''

	useEffect(() => {
		const fetchData = async () => {
			setIsSearching(true)
			const data = getfilteredData(props.result)
			const result = await modifiedData(data)

			if (props.bookmarks) {
				const bookmarkedResult = await getBookmarkedShows(result)
				setShows(bookmarkedResult)
			} else {
				setShows(result)
			}

			setIsSearching(false)
		}
		fetchData()
	}, [props.result, props.bookmarks])

	if (resultsNumber === 0) {
		resultText = 'No results found'
	} else if (resultsNumber === 1) {
		resultText = `Found 1 result for '${props.result}'`
	} else {
		resultText = `Found ${resultsNumber} results for '${props.result}'`
	}

	return (
		<div>
			{isSearching ? (
				<div className='mt-[7rem]'>
					<Loader />
				</div>
			) : (
				<>
					<Heading content={resultText} />
					{resultsNumber > 0 && <CardsList cards={shows} />}
				</>
			)}
		</div>
	)
}
