import { DataType } from '../types/types'
import { getBookmarkedShows, modifiedData } from '../lib/data-utils'
import { useCallback, useEffect, useState } from 'react'

export const useBookmarkedDataFetcher = (data: DataType[]) => {
	const [shows, setShows] = useState<DataType[]>([])
	const [isLoading, setIsLoading] = useState(true)

	const fetchData = useCallback(async () => {
		const modifiedShows = await modifiedData(data)
		const bookmarkedData = await getBookmarkedShows(modifiedShows)
		setShows(bookmarkedData)
		setIsLoading(false)
	}, [data])

	useEffect(() => {
		fetchData()
	}, [fetchData])

	return { shows, isLoading }
}
