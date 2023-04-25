import { getMovies } from '../lib/data-utils'
import { CardsList } from '../components/ui/Card/CardsList'
import { Heading } from '../components/ui/Text/Heading'
import { Loader } from '../components/ui/Loader/Loader'
import { SearchResults } from '../components/ui/SearchResults/SearchResults'
import { Searchbar } from '../components/ui/Searchbar/Searchbar'
import { getSession } from 'next-auth/react'
import { GetServerSidePropsContext } from 'next'
import { DataType } from '../types/types'
import { useSearch } from '../hooks/useSearch'
import { useDataFetcher } from '../hooks/useDataFetcher'

type Props = {
	moviesData: DataType[]
}

export default function MoviesPage({ moviesData }: Props) {
	const { isSearching, filteredResults, filterResults } = useSearch()
	const { shows: movies, isLoading: isMoviesLoading } = useDataFetcher(moviesData)

	return (
		<>
			<Searchbar
				placeholder='Search for movies'
				onSearch={filterResults}
			/>

			{isSearching ? (
				<SearchResults result={filteredResults} />
			) : (
				<>
					<Heading content='Movies' />
					{isMoviesLoading ? <Loader /> : <CardsList cards={movies} />}
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
		props: { session, moviesData: getMovies() },
	}
}
