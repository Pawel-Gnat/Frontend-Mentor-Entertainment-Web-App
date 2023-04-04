import { getMoviesOnly } from '../lib/data-utils'
import { useEffect, useState } from 'react'
import { CardsList } from '../components/ui/Card/CardsList'
import { Heading } from '../components/ui/Text/Heading'
import { Loader } from '../components/ui/Loader/Loader'
import { SearchResults } from '../components/ui/SearchResults/SearchResults'
import { Searchbar } from '../components/ui/Searchbar/Searchbar'

type Movies = {
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
	moviesData: Movies[]
}

export default function MoviesPage(props: Props) {
	const { moviesData } = props
	const [isMoviesLoading, setIsMoviesLoading] = useState(true)
	const [movies, setMovies] = useState<Movies[]>([])
	const [isSearching, setIsSearching] = useState(false)
	const [filteredResults, setFilteredResults] = useState('')

	useEffect(() => {
		setMovies(moviesData)
		setIsMoviesLoading(false)
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

export async function getStaticProps() {
	return {
		props: {
			moviesData: getMoviesOnly(),
		},
	}
}
