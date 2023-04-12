import data from '../pages/api/data.json'

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
