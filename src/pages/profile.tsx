import { signOut } from 'next-auth/react'
import { getSession } from 'next-auth/react'

export default function ProfilePage() {
	function logoutHandler() {
		signOut()
	}

	return (
		<>
			<h1 className='text-3xl font-light text-pureWhite'>Profile page</h1>
			<button
				className='py-[2rem] px-[4rem] rounded-full bg-pureWhite'
				onClick={logoutHandler}>
				Logout
			</button>
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
