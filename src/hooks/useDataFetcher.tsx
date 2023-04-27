import { DataType } from '../types/types'
import { modifyData } from '../utils/dataUtils'
import { useCallback, useEffect, useState } from 'react'

export const useDataFetcher = (data: DataType[]) => {
	const [shows, setShows] = useState<DataType[]>([])
	const [isLoading, setIsLoading] = useState(true)

	const fetchData = useCallback(async () => {
		const result = await modifyData(data)
		setShows(result)
		setIsLoading(false)
	}, [data])

	useEffect(() => {
		fetchData()
	}, [fetchData])

	return { shows, isLoading }
}
