import { Searchbar } from '../components/ui/Searchbar/Searchbar'
import { useEffect, useState } from 'react'
import { getSession } from 'next-auth/react'
import { GetServerSidePropsContext } from 'next'
import { modifiedData, getMovies, getTvSeries, getBookmarkedShows } from '../lib/data-utils'
import { CardsList } from '../components/ui/Card/CardsList'
import { Heading } from '../components/ui/Text/Heading'
import { Text } from '../components/ui/Text/Text'
import { Loader } from '../components/ui/Loader/Loader'
import { SearchResults } from '../components/ui/SearchResults/SearchResults'
import { DataType } from '..//types/types'

type Props = {
	moviesData: DataType[]
	tvSeriesData: DataType[]
}

export default function BookmarkedPage(props: Props) {
	const { moviesData, tvSeriesData } = props
	const [bookmarkedMovies, setBookmarkedMovies] = useState<DataType[]>([])
	const [bookmarkedTvSeries, setBookmarkedTvSeries] = useState<DataType[]>([])
	const [isBookmarkedMoviesLoading, setIsBookmarkedMoviesLoading] = useState(true)
	const [isBookmarkedTvSeriesLoading, setIsBookmarkedTvSeriesLoading] = useState(true)
	const [isSearching, setIsSearching] = useState(false)
	const [filteredResults, setFilteredResults] = useState('')

	useEffect(() => {
		const fetchData = async () => {
			const data = await modifiedData(moviesData)
			const bookmarkedData = await getBookmarkedShows(data)
			setBookmarkedMovies(bookmarkedData)
			setIsBookmarkedMoviesLoading(false)
		}
		fetchData()
	}, [bookmarkedMovies, moviesData])

	useEffect(() => {
		const fetchData = async () => {
			const data = await modifiedData(tvSeriesData)
			const bookmarkedData = await getBookmarkedShows(data)
			setBookmarkedTvSeries(bookmarkedData)
			setIsBookmarkedTvSeriesLoading(false)
		}
		fetchData()
	}, [bookmarkedTvSeries, tvSeriesData])

	const filterResults = (result: string) => {
		if (result.trim() === '') {
			setIsSearching(false)
		} else {
			setFilteredResults(result)
			setIsSearching(true)
		}
	}

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
