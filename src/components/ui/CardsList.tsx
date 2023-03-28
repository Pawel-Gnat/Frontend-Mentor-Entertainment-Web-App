import { Card } from './Card'

type Props = {
	cards: {
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
	}[]
}

export const CardsList = (props: Props) => {
	const listElements = props.cards

	return (
		<ul className='grid grid-cols-2 gap-[1.5rem]'>
			{listElements.map(el => (
				<li key={el.title}>
					<Card
						regular={el.thumbnail.regular}
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
