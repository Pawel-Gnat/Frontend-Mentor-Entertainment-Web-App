import { getRecommendedShows, getTrendingShows } from '../lib/data-utils'
import { useEffect, useState } from 'react'
import { Searchbar } from '../components/ui/Searchbar'
import { CardsList } from '../components/ui/CardsList'
import { Heading } from '../components/ui/Heading'
import { TrendingCardsList } from '@/components/ui/TrendingCardsList'

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
	const [recommendedShows, setRecommendedShows] = useState<RecommendedShows[]>([])
	const [trendingShows, setTrendingShows] = useState<TrendingShows[]>([])

	useEffect(() => {
		setTrendingShows(trendingShowsData)
	}, [trendingShows, trendingShowsData])

	useEffect(() => {
		setRecommendedShows(recommendedShowsData)
	}, [recommendedShows, recommendedShowsData])

	return (
		<>
			<Searchbar placeholder='Search for movies or TV series' />
			<Heading content='Trending' />
			<TrendingCardsList cards={trendingShows} />
			<Heading content='Recommended for you' />
			<CardsList cards={recommendedShows} />
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
