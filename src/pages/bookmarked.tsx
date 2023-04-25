import { Searchbar } from '../components/ui/Searchbar/Searchbar'
import { getSession } from 'next-auth/react'
import { GetServerSidePropsContext } from 'next'
import { getMovies, getTvSeries } from '../lib/data-utils'
import { CardsList } from '../components/ui/Card/CardsList'
import { Heading } from '../components/ui/Text/Heading'
import { Text } from '../components/ui/Text/Text'
import { Loader } from '../components/ui/Loader/Loader'
import { SearchResults } from '../components/ui/SearchResults/SearchResults'
import { DataType } from '..//types/types'
import { useSearch } from '../hooks/useSearch'
import { useBookmarkedDataFetcher } from '../hooks/useBookmarkedDataFetcher'

type Props = {
	moviesData: DataType[]
	tvSeriesData: DataType[]
}

export default function BookmarkedPage({ moviesData, tvSeriesData }: Props) {
	const { isSearching, filteredResults, filterResults } = useSearch()
	const { shows: bookmarkedMovies, isLoading: isBookmarkedMoviesLoading } = useBookmarkedDataFetcher(moviesData)
	const { shows: bookmarkedTvSeries, isLoading: isBookmarkedTvSeriesLoading } = useBookmarkedDataFetcher(tvSeriesData)

	const showsHandler = (shows: DataType[], title: string) => {
		if (shows.length === 0) {
			return <Text content={`You don't have any bookmarked ${title}`} />
		} else {
			return <CardsList cards={shows} />
		}
	}

	return (
		<>
			<Searchbar
				placeholder='Search for bookmarked shows'
				onSearch={filterResults}
			/>

			{isSearching ? (
				<SearchResults
					result={filteredResults}
					bookmarks={true}
				/>
			) : (
				<>
					<Heading content='Bookmarked Movies' />
					{isBookmarkedMoviesLoading ? <Loader /> : showsHandler(bookmarkedMovies, 'movies')}
					<Heading content='Bookmarked TV Series' />
					{isBookmarkedTvSeriesLoading ? <Loader /> : showsHandler(bookmarkedTvSeries, 'TV series')}
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
		props: { session, moviesData: getMovies(), tvSeriesData: getTvSeries() },
	}
}
