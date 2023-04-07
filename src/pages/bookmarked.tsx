import { Searchbar } from '../components/ui/Searchbar/Searchbar'
import { getSession } from 'next-auth/react'

export default function BookmarkedPage() {
	return (
		<>
			{/* <Searchbar
				placeholder='Search for bookmarked shows'
				onSearch={filterResults}
			/> */}
		</>
	)
}

export const getServerSideProps = async context => {
	const session = await getSession({ req: context.req })

	if (!session) {
		return {
			redirect: {
				destination: '/auth',
				permament: false,
			},
		}
	}

	return {
		props: { session },
	}
}
