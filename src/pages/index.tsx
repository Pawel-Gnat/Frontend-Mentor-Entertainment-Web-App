import { getRecommendedShows, getTrendingShows } from '../lib/data-utils'
import { useEffect, useState } from 'react'
import { Searchbar } from '../components/ui/Searchbar/Searchbar'
import { CardsList } from '../components/ui/Card/CardsList'
import { Heading } from '../components/ui/Text/Heading'
import TrendingCardsList from '../components/ui/Card/TrendingCardsList'
import { Loader } from '@/components/ui/Loader/Loader'
import { SearchResults } from '@/components/ui/SearchResults/SearchResults'

type RecommendedShows = {
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

type TrendingShows = {
	title: string
	thumbnail: {
		trending: {
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
	trendingShowsData: TrendingShows[]
	recommendedShowsData: RecommendedShows[]
}

export default function HomePage(props: Props) {
	const { trendingShowsData, recommendedShowsData } = props
	const [isTrendingShowsLoading, setIsTrendingShowsLoading] = useState(true)
	const [isRecommendedShowsLoading, setIsRecommendedShowsLoading] = useState(true)
	const [recommendedShows, setRecommendedShows] = useState<RecommendedShows[]>([])
	const [trendingShows, setTrendingShows] = useState<TrendingShows[]>([])
	const [isSearching, setIsSearching] = useState(false)
	const [filteredResults, setFilteredResults] = useState('')

	useEffect(() => {
		setTrendingShows(trendingShowsData)
		setIsTrendingShowsLoading(false)
	}, [trendingShows, trendingShowsData])

	useEffect(() => {
		setRecommendedShows(recommendedShowsData)
		setIsRecommendedShowsLoading(false)
	}, [recommendedShows, recommendedShowsData])

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

export async function getStaticProps() {
	return {
		props: {
			trendingShowsData: getTrendingShows(),
			recommendedShowsData: getRecommendedShows(),
		},
	}
}
