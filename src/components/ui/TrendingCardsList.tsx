import { Component } from 'react'
import Slider from 'react-slick'
import { TrendingCard } from './TrendingCard'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

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

export default class TrendingCardsList extends Component<Props> {
	render() {
		const { cards } = this.props

		const settings = {
			dots: false,
			slidesToShow: 2.5,
			slidesToScroll: 1,
			arrows: false,
			responsive: [
				{
					breakpoint: 1440,
					settings: {
						slidesToShow: 1.46,
					},
				},
				{
					breakpoint: 640,
					settings: {
						slidesToShow: 1.4,
					},
				},
			],
		}

		return (
			<ul>
				<Slider {...settings}>
					{cards.map(el => (
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
				</Slider>
			</ul>
		)
	}
}
