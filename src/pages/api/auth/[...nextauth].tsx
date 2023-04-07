import { connectToDatabase } from '../../../lib/database'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'

type User = {
	password: string
}

export default NextAuth({
	session: {
		strategy: 'jwt',
	},
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			authorize: async (credentials: Record<string, string>) => {
				const client = await connectToDatabase()

				const userCollection = client.db().collection('users')

				const user = await userCollection.findOne({ email: credentials.email })

				if (!user) {
					client.close()
					throw new Error('User not found')
				}

				if (user.password !== credentials.password) {
					client.close()
					throw new Error('Wrong password')
				}

				client.close()
				return { email: user.email }
			},
		}),
	],
})
