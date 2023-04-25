import { signOut } from 'next-auth/react'
import { getSession } from 'next-auth/react'
import { GetServerSidePropsContext } from 'next'
import { useState } from 'react'
import { AuthButton } from '../components/ui/Button/Button'
import { ProfileForm } from '@/components/profile/ProfileForm'
import { Heading } from '../components/ui/Text/Text'
import { SessionType } from '../types/types'

export default function ProfilePage(props: SessionType) {
	const [isLoading, setIsLoading] = useState(false)
	const userName = props.session.user.email.split('@')[0]

	function logoutHandler() {
		setIsLoading(true)
		signOut()
		setIsLoading(false)
	}

	return (
		<div className='flex flex-col min-h-[70vh] pr-[1.6rem] md:pr-[2.4rem] xl:pr-[3.6rem]'>
			<Heading content={`Hello ${userName}, it's your profile page.`} />
			<Heading content='You can change your password below.' />
			<div className='flex flex-col justify-center grow h-full w-full max-w-[35rem] mx-auto'>
				<ProfileForm />
				<AuthButton
					isLoading={isLoading}
					content='Logout'
					onClick={logoutHandler}
				/>
			</div>
		</div>
	)
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
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
