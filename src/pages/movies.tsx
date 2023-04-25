import { getMovies, modifiedData } from '../lib/data-utils'
import { useEffect, useState } from 'react'
import { CardsList } from '../components/ui/Card/CardsList'
import { Heading } from '../components/ui/Text/Text'
import { Loader } from '../components/ui/Loader/Loader'
import { SearchResults } from '../components/ui/SearchResults/SearchResults'
import { Searchbar } from '../components/ui/Searchbar/Searchbar'
import { getSession } from 'next-auth/react'
import { GetServerSidePropsContext } from 'next'
import { DataType } from '../types/types'

type Props = {
	moviesData: DataType[]
}

export default function MoviesPage(props: Props) {
	const { moviesData } = props
	const [isMoviesLoading, setIsMoviesLoading] = useState(true)
	const [movies, setMovies] = useState<DataType[]>([])
	const [isSearching, setIsSearching] = useState(false)
	const [filteredResults, setFilteredResults] = useState('')

	useEffect(() => {
		const fetchData = async () => {
			const data = await modifiedData(moviesData)
			setMovies(data)
			setIsMoviesLoading(false)
		}
		fetchData()
	}, [movies, moviesData])

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
