import { Card } from './Card'
import { DataType } from '../../../types/types'

type Props = {
	cards: DataType[]
}

export const CardsList = (props: Props) => {
	const listElements = props.cards

	return (
		<ul className='grid grid-cols-cards-mobile gap-y-[1.6rem] gap-x-[1.5rem] pr-[1.6rem] md:grid-cols-cards-tablet md:gap-y-[2.4rem] md:gap-x-[2.9rem] md:pr-[2.4rem] lg:grid-cols-cards-desktop lg:gap-y-[3.2rem] lg:gap-x-[4rem] xl:pr-[3.6rem]'>
			{listElements.map(el => (
				<li key={el.title}>
					<Card
						regular={el.thumbnail.regular}
						title={el.title}
						rating={el.rating}
						category={el.category}
						year={el.year}
						bookmarked={el.isBookmarked}
					/>
				</li>
			))}
		</ul>
	)
}
