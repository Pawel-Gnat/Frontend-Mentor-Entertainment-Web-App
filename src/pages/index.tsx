import { getRecommendedShows, getTrendingShows, modifiedData } from '../lib/data-utils'
import { useEffect, useState } from 'react'
import { Searchbar } from '../components/ui/Searchbar/Searchbar'
import { CardsList } from '../components/ui/Card/CardsList'
import { Heading } from '../components/ui/Text/Text'
import TrendingCardsList from '../components/ui/Card/TrendingCardsList'
import { Loader } from '../components/ui/Loader/Loader'
import { SearchResults } from '../components/ui/SearchResults/SearchResults'
import { getSession } from 'next-auth/react'
import { GetServerSidePropsContext } from 'next'
import { DataType } from '../types/types'

type Props = {
	trendingShowsData: DataType[]
	recommendedShowsData: DataType[]
}

export default function HomePage(props: Props) {
	const { trendingShowsData, recommendedShowsData } = props
	const [isTrendingShowsLoading, setIsTrendingShowsLoading] = useState(true)
	const [isRecommendedShowsLoading, setIsRecommendedShowsLoading] = useState(true)
	const [recommendedShows, setRecommendedShows] = useState<DataType[]>([])
	const [trendingShows, setTrendingShows] = useState<DataType[]>([])
	const [isSearching, setIsSearching] = useState(false)
	const [filteredResults, setFilteredResults] = useState('')

	useEffect(() => {
		const fetchData = async () => {
			const data = await modifiedData(trendingShowsData)
			setTrendingShows(data)
			setIsTrendingShowsLoading(false)
		}
		fetchData()
	}, [trendingShowsData])

	useEffect(() => {
		const fetchData = async () => {
			const data = await modifiedData(recommendedShowsData)
			setRecommendedShows(data)
			setIsRecommendedShowsLoading(false)
		}
		fetchData()
	}, [recommendedShowsData])

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
				placeholder='Search for movies or TV series'
				onSearch={filterResults}
			/>

			{isSearching ? (
				<SearchResults result={filteredResults} />
			) : (
				<>
					<Heading content='Trending' />
					{isTrendingShowsLoading ? <Loader /> : <TrendingCardsList cards={trendingShows} />}
					<Heading content='Recommended for you' />
					{isRecommendedShowsLoading ? <Loader /> : <CardsList cards={recommendedShows} />}
				</>
			)}
		</>
	)
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
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
		props: { session, trendingShowsData: getTrendingShows(), recommendedShowsData: getRecommendedShows() },
	}
}
