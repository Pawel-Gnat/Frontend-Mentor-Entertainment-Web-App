import { DataType } from '../types/types'
import { getBookmarkedShows, modifyData } from '../utils/dataUtils'
import { useCallback, useEffect, useState } from 'react'

export const useBookmarkedDataFetcher = (data: DataType[]) => {
	const [shows, setShows] = useState<DataType[]>([])
	const [isLoading, setIsLoading] = useState(true)

	const fetchData = useCallback(async () => {
		const modifiedShows = await modifyData(data)
		const bookmarkedData = await getBookmarkedShows(modifiedShows)
		setShows(bookmarkedData)
		setIsLoading(false)
	}, [data])

	useEffect(() => {
		fetchData()
	}, [fetchData])

	return { shows, isLoading }
}
