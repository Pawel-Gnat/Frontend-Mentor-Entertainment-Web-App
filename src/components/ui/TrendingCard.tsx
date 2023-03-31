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
		<div className='relative w-full h-[14rem] rounded-[0.8rem] overflow-hidden cursor-pointer md:h-[23rem]  xl:h-[27rem]'>
			<Image
				src={trending.small}
				fill
				className='w-full object-cover lg:hidden'
				alt={title}
			/>
			<Image
				src={trending.large}
				fill
				className='hidden w-full object-cover lg:inline-flex'
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

			<div className='absolute bottom-[1.6rem] left-[1.6rem]'>
				<div className='flex gap-[0.8rem] text-trending-text font-light text-pureWhite mt-[0.8rem] opacity-75 '>
					<span className='cursor-default'>{year}</span>
					&bull;
					<Image
						src={category === 'Movies' ? '/assets/icons/icon-category-movie.svg' : '/assets/icons/icon-category-tv.svg'}
						width={12}
						height={12}
						className='aspect-square my-auto'
						alt=''
						aria-hidden='true'
					/>
					<span className='cursor-default'>{category}</span>
					&bull;<span className='cursor-default'>{rating}</span>
				</div>
				<strong className='text-trending-title font-medium text-pureWhite cursor-default'>{title}</strong>
			</div>
		</div>
	)
}
