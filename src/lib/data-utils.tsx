import data from '../pages/api/data.json'

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
	isBookmarked?: boolean
}

export async function handleBookmarks(method: string = 'GET', title: string = '') {
	if (title) {
		const response = await fetch('/api/user/handle-bookmarks', {
			method: method,
			body: JSON.stringify({ title }),
			headers: {
				'Content-Type': 'application/json',
			},
		})

		const data = await response.json()

		if (!response.ok) {
			return {
				error: {
					message: data.message,
					field: data.field,
				},
			}
		}

		return data
	} else {
		const response = await fetch('/api/user/handle-bookmarks')

		const data = await response.json()

		if (!response.ok) {
			return {
				error: {
					message: data.message,
					field: data.field,
				},
			}
		}

		return data
	}
}

export const modifiedData = async (data: Shows[]) => {
	const userBookmarkedShows = await handleBookmarks()

	return data.map(show => {
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

export const getMoviesOnly = () => {
	return data.filter(el => el.category === 'Movie')
}

export const getTvSeriesOnly = () => {
	return data.filter(el => el.category === 'TV Series')
}

export const getfilteredData = (result: string) => {
	if (window.location.pathname === '/movies') {
		return getMoviesOnly().filter(el => el.title.toLowerCase().includes(result.toLowerCase()))
	} else if (window.location.pathname === '/tv-series') {
		return getTvSeriesOnly().filter(el => el.title.toLowerCase().includes(result.toLowerCase()))
	} else {
		return data.filter(el => el.title.toLowerCase().includes(result.toLowerCase()))
	}
}
