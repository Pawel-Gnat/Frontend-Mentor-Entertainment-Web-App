import { getRecommendedShows } from '../lib/data-utils'
import { useEffect, useState } from 'react'
import { Searchbar } from '../components/ui/Searchbar'
import { CardsList } from '../components/ui/CardsList'
import { Heading } from '../components/ui/Heading'

type Shows = {
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
	data: Shows[]
}

export default function HomePage(props: Props) {
	const { data } = props
	const [recommendedShows, setRecommendedShows] = useState<Shows[]>([])

	useEffect(() => {
		setRecommendedShows(data)
	}, [data])

	return (
		<>
			<Searchbar placeholder='Search for movies or TV series' />
			<Heading content='Trending' />
			<Heading content='Recommended for you' />
			<CardsList cards={recommendedShows} />
		</>
	)
}

export async function getStaticProps() {
	return {
		props: {
			data: getRecommendedShows(),
		},
	}
}
