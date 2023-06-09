import { DataType } from '../../../types/types'
import { getBookmarkedShows, getfilteredData, modifyData } from '../../../utils/dataUtils'
import { CardsList } from '../Card/CardsList'
import { Loader } from '../Loader/Loader'
import { Heading } from '../Text/Heading'
import { useEffect, useState } from 'react'

export const SearchResults = (props: { result: string; bookmarks?: boolean }) => {
	const [shows, setShows] = useState<DataType[]>([])
	const [isSearching, setIsSearching] = useState(false)
	const resultsNumber = shows.length
	let resultText = ''

	useEffect(() => {
		const fetchData = async () => {
			setIsSearching(true)
			const data = getfilteredData(props.result)
			const result = await modifyData(data)

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
