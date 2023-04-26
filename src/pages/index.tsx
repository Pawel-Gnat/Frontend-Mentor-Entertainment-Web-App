import { getRecommendedShows, getTrendingShows } from '../utils/dataUtils'
import { Searchbar } from '../components/ui/Searchbar/Searchbar'
import { CardsList } from '../components/ui/Card/CardsList'
import { Heading } from '../components/ui/Text/Heading'
import TrendingCardsList from '../components/ui/Card/TrendingCardsList'
import { Loader } from '../components/ui/Loader/Loader'
import { SearchResults } from '../components/ui/SearchResults/SearchResults'
import { getSession } from 'next-auth/react'
import { GetServerSidePropsContext } from 'next'
import { DataType } from '../types/types'
import { useSearch } from '../hooks/useSearch'
import { useDataFetcher } from '../hooks/useDataFetcher'

type Props = {
	trendingShowsData: DataType[]
	recommendedShowsData: DataType[]
}

export default function HomePage({ trendingShowsData, recommendedShowsData }: Props) {
	const { isSearching, filteredResults, filterResults } = useSearch()
	const { shows: trendingShows, isLoading: isTrendingShowsLoading } = useDataFetcher(trendingShowsData)
	const { shows: recommendedShows, isLoading: isRecommendedShowsLoading } = useDataFetcher(recommendedShowsData)

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
