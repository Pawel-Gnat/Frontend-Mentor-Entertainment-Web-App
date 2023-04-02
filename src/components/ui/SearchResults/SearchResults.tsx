import { getfilteredData } from '../../../lib/data-utils'
import { CardsList } from '../Card/CardsList'
import { Heading } from '../Text/Heading'
import { useEffect, useState } from 'react'

type Props = {
	result: string
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
}

export const SearchResults = (props: Props) => {
	const [shows, setShows] = useState<Shows[]>([])
	const resultsNumber = shows.length
	let resultText = ''

	useEffect(() => {
		setShows(getfilteredData(props.result))
	}, [props.result])

	if (resultsNumber === 0) {
		resultText = 'No results found'
	} else if (resultsNumber === 1) {
		resultText = `Found 1 result for '${props.result}'`
	} else {
		resultText = `Found ${resultsNumber} results for '${props.result}'`
	}

	return (
		<div>
			<Heading content={resultText} />
			{resultsNumber > 0 && <CardsList cards={shows} />}
		</div>
	)
}
