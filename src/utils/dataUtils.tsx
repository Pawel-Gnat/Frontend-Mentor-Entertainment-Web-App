import { DataType } from '../types/types'
import data from '../pages/api/data.json'
import { handleBookmarks } from './handleBookmarks'

export const modifiedData = async (shows: DataType[] = data) => {
	const userBookmarkedShows = await handleBookmarks()

	return shows.map(show => {
		if (userBookmarkedShows.includes(show.title)) {
			return { ...show, isBookmarked: true }
		} else {
			return { ...show, isBookmarked: false }
		}
	})
}

export const getRecommendedShows = () => {
	return data.filter(el => el.isTrending === false)
}

export const getTrendingShows = () => {
	return data.filter(el => el.isTrending === true)
}

export const getMovies = () => {
	return data.filter(el => el.category === 'Movie')
}

export const getTvSeries = () => {
	return data.filter(el => el.category === 'TV Series')
}

export const getBookmarkedShows = async (data: DataType[]) => {
	const bookmarkedShows = await modifiedData(data)
	return bookmarkedShows.filter(el => el.isBookmarked === true)
}

export const getfilteredData = (result: string) => {
	if (window.location.pathname === '/movies') {
		return getMovies().filter(el => el.title.toLowerCase().includes(result.toLowerCase()))
	} else if (window.location.pathname === '/tv-series') {
		return getTvSeries().filter(el => el.title.toLowerCase().includes(result.toLowerCase()))
	} else {
		return data.filter(el => el.title.toLowerCase().includes(result.toLowerCase()))
	}
}
