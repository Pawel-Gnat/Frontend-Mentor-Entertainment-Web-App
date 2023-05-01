import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Searchbar } from '../../../../src/components/ui/Searchbar/Searchbar'
import HomePage from '../../../../src/pages'

// 	// <Searchbar
// 	//     placeholder='Search for movies or TV series'
// 	//     onSearch={() => {}}
// 	// />

describe('HomePage component', () => {
	it('renders searchbar component', () => {
		render(
			<HomePage
				trendingShowsData={[]}
				recommendedShowsData={[]}
			/>
		)
		expect(screen.queryByTestId('searchbar')).toBeInTheDocument()
	})
})
