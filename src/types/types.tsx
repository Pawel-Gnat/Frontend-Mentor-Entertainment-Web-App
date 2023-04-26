export type DataType = {
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

export type CardsType = {
	title: string
	year: number
	category: string
	rating: string
	regular: {
		small: string
		medium: string
		large: string
	}
	bookmarked: boolean
}

export type TrendingCardsType = {
	title: string
	year: number
	category: string
	rating: string
	trending?: {
		small: string
		large: string
	}
	bookmarked: boolean
}

export type NotificationType = {
	active?: boolean
	field?: string
	message: string
	status: string
}

export type SessionType = {
	session: {
		user: {
			email: string
		}
		expires: string
	}
}
