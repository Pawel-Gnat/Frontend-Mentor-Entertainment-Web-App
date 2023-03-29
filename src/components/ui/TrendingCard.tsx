import Image from 'next/image'

type Props = {
	title: string
	year: number
	category: string
	rating: string
	trending: {
		small: string
		large: string
	}
}

export const TrendingCard = (props: Props) => {
	const { year, category, rating, title, trending } = props

	return (
		<div className='relative w-full rounded-[0.8rem] overflow-hidden cursor-pointer'>
			<Image
				src={trending.small}
				width={240}
				height={140}
				className='w-full lg:hidden'
				alt={title}
			/>
			<Image
				src={trending.large}
				width={240}
				height={140}
				className='hidden w-full lg:inline-flex'
				alt={title}
			/>

			<button
				type='button'
				className='absolute top-[0.8rem] right-[0.8rem]
					h-[3.2rem] w-[3.2rem] p-[0.9rem] rounded-full bg-darkBlue/50'
				aria-label='Bookmark'>
				<Image
					src='/assets/icons/icon-bookmark-empty.svg'
					width={12}
					height={14}
					className='h-full w-auto m-auto'
					alt=''
					aria-hidden='true'
				/>
			</button>

			<div>
				<div className='flex gap-[0.5rem] text-card-text font-light text-pureWhite mt-[0.8rem] opacity-75 '>
					<span className='cursor-default'>{year}</span>
					&bull;
					<Image
						src={category === 'Movies' ? '/assets/icons/icon-category-movie.svg' : '/assets/icons/icon-category-tv.svg'}
						width={10}
						height={10}
						className='aspect-square my-auto'
						alt=''
						aria-hidden='true'
					/>
					<span className='cursor-default'>{category}</span>
					&bull;<span className='cursor-default'>{rating}</span>
				</div>
				<strong className='text-card-title font-medium text-pureWhite cursor-default'>{title}</strong>
			</div>
		</div>
	)
}
