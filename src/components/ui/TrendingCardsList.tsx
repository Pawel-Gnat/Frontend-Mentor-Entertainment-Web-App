import { TrendingCard } from './TrendingCard'

type Props = {
	cards: {
		title: string
		thumbnail: {
			trending: {
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
	}[]
}

export const TrendingCardsList = (props: Props) => {
	const listElements = props.cards

	console.log(listElements)

	return (
		// <ul className='grid grid-cols-cards-mobile gap-y-[1.6rem] gap-x-[1.5rem] md:grid-cols-cards-tablet md:gap-y-[2.4rem] md:gap-x-[2.9rem] lg:grid-cols-cards-desktop lg:gap-y-[3.2rem] lg:gap-x-[4rem]'>
		<ul className='flex flex-row gap-[1.6rem]'>
			{listElements.map(el => (
				<li key={el.title}>
					<TrendingCard
						trending={el.thumbnail.trending}
						title={el.title}
						rating={el.rating}
						category={el.category}
						year={el.year}
					/>
				</li>
			))}
		</ul>
	)
}
