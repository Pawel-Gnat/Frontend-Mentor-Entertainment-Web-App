import { DataType } from '../types/types'
import { modifiedData } from '../lib/data-utils'
import { useCallback, useEffect, useState } from 'react'

export const useDataFetcher = (data: DataType[]) => {
	const [shows, setShows] = useState<DataType[]>([])
	const [isLoading, setIsLoading] = useState(true)

	const fetchData = useCallback(async () => {
		const result = await modifiedData(data)
		setShows(result)
		setIsLoading(false)
	}, [data])

	useEffect(() => {
		fetchData()
	}, [fetchData])

	return { shows, isLoading }
}
