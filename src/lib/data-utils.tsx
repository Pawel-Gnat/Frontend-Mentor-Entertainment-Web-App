import data from '../pages/api/data.json'

export const getRecommendedShows = () => {
	return data.filter(el => el.isTrending === false)
}

export const getTrendingShows = () => {
	return data.filter(el => el.isTrending === true)
}

export const getMoviesOnly = () => {
	return data.filter(el => el.category === 'Movies')
}

export const getTVSeriesOnly = () => {
	return data.filter(el => el.category === 'TV Series')
}
