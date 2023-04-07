import { AuthForm } from '../components/auth/AuthForm'
import { getSession } from 'next-auth/react'

export default function AuthPage() {
	return <AuthForm />
}

export const getServerSideProps = async context => {
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
