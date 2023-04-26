import { useState } from 'react'
import { handleBookmarks } from '../utils/handleBookmarks'
import { NotificationType } from '../types/types'

export const useBookmark = (props: {
	title: string
	bookmarked: boolean
	handleNotification: (result: NotificationType) => void
}) => {
	const [isBookmarked, setIsBookmarked] = useState(props.bookmarked)
	const [isBookmarking, setIsBookmarking] = useState(false)

	const handleBookmark = async () => {
		setIsBookmarking(true)
		const userBookmarks = await handleBookmarks()

		if (!userBookmarks) return

		if (userBookmarks.includes(props.title)) {
			const result = await handleBookmarks('DELETE', props.title)
			props.handleNotification(result)
		} else {
			const result = await handleBookmarks('POST', props.title)
			console.log(result)
			props.handleNotification(result)
		}

		setIsBookmarked(prev => !prev)
		setIsBookmarking(false)
	}

	return { isBookmarked, isBookmarking, handleBookmark }
}
