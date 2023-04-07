import { getTvSeriesOnly } from '../lib/data-utils'
import { useEffect, useState } from 'react'
import { CardsList } from '../components/ui/Card/CardsList'
import { Heading } from '../components/ui/Text/Heading'
import { Loader } from '../components/ui/Loader/Loader'
import { SearchResults } from '../components/ui/SearchResults/SearchResults'
import { Searchbar } from '../components/ui/Searchbar/Searchbar'
import { getSession } from 'next-auth/react'

type TvSeries = {
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

type Props = {
	TvSeriesData: TvSeries[]
}

export default function TvSeriesPage(props: Props) {
	const { TvSeriesData } = props
	const [isTvSeriesLoading, setIsTvSeriesLoading] = useState(true)
	const [tvSeries, setTvSeries] = useState<TvSeries[]>([])
	const [isSearching, setIsSearching] = useState(false)
	const [filteredResults, setFilteredResults] = useState('')

	useEffect(() => {
		setTvSeries(TvSeriesData)
		setIsTvSeriesLoading(false)
	}, [tvSeries, TvSeriesData])

	const filterResults = (result: string) => {
		if (result.trim() === '') {
			setIsSearching(false)
		} else {
			setFilteredResults(result)
			setIsSearching(true)
		}
	}

	return (
		<>
			<Searchbar
				placeholder='Search for TV series'
				onSearch={filterResults}
			/>

			{isSearching ? (
				<SearchResults result={filteredResults} />
			) : (
				<>
					<Heading content='TV Series' />
					{isTvSeriesLoading ? <Loader /> : <CardsList cards={tvSeries} />}
				</>
			)}
		</>
	)
}

export const getServerSideProps = async context => {
	const session = await getSession({ req: context.req })

	if (!session) {
		return {
			redirect: {
				destination: '/auth',
				permament: false,
			},
		}
	}

	return {
		props: { session, TvSeriesData: getTvSeriesOnly() },
	}
}
