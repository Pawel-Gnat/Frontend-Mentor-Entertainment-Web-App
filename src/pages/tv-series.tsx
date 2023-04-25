import { getTvSeries, modifiedData } from '../lib/data-utils'
import { useEffect, useState } from 'react'
import { CardsList } from '../components/ui/Card/CardsList'
import { Heading } from '../components/ui/Text/Heading'
import { Loader } from '../components/ui/Loader/Loader'
import { SearchResults } from '../components/ui/SearchResults/SearchResults'
import { Searchbar } from '../components/ui/Searchbar/Searchbar'
import { getSession } from 'next-auth/react'
import { GetServerSidePropsContext } from 'next'
import { DataType } from '../types/types'

type Props = {
	tvSeriesData: DataType[]
}

export default function TvSeriesPage(props: Props) {
	const { tvSeriesData } = props
	const [isTvSeriesLoading, setIsTvSeriesLoading] = useState(true)
	const [tvSeries, setTvSeries] = useState<DataType[]>([])
	const [isSearching, setIsSearching] = useState(false)
	const [filteredResults, setFilteredResults] = useState('')

	useEffect(() => {
		const fetchData = async () => {
			const data = await modifiedData(tvSeriesData)
			setTvSeries(data)
			setIsTvSeriesLoading(false)
		}
		fetchData()
	}, [tvSeries, tvSeriesData])

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
				placeholder='Search for TV series'
				onSearch={filterResults}
			/>

			{isSearching ? (
				<SearchResults result={filteredResults} />
			) : (
				<>
					<Heading content='TV Series' />
					{isTvSeriesLoading ? <Loader /> : <CardsList cards={tvSeries} />}
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
		props: { session, tvSeriesData: getTvSeries() },
	}
}
