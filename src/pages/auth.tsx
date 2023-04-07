import { AuthForm } from '../components/auth/AuthForm'
import { getSession } from 'next-auth/react'
import { GetServerSidePropsContext } from 'next'

export default function AuthPage() {
	return <AuthForm />
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
	const session = await getSession({ req: context.req })

	if (session) {
		return {
			redirect: {
				destination: '/',
				permament: false,
			},
		}
	}

	return {
		props: { session },
	}
}
