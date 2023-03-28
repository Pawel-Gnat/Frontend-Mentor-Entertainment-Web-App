import Image from 'next/image'

type Props = {
	title: string
	year: number
	category: string
	rating: string
	regular: {
		small: string
		medium: string
		large: string
	}
}

export const Card = (props: Props) => {
	const { year, category, rating, title, regular } = props

	return (
		<div>
			<div className='relative w-max rounded-[0.8rem] overflow-hidden cursor-pointer'>
				<Image
					src={regular.small}
					priority
					width={164}
					height={110}
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
			</div>
			<div className='flex gap-[0.5rem] text-[1.1rem] font-light text-pureWhite mt-[0.8rem] opacity-75 '>
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
			<strong className='text-[1.4rem] font-medium text-pureWhite cursor-default'>{title}</strong>
		</div>
	)
}
