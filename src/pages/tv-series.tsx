import { getTvSeries } from '../utils/dataUtils'
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
	tvSeriesData: DataType[]
}

export default function TvSeriesPage({ tvSeriesData }: Props) {
	const { isSearching, filteredResults, filterResults } = useSearch()
	const { shows: tvSeries, isLoading: isTvSeriesLoading } = useDataFetcher(tvSeriesData)

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
