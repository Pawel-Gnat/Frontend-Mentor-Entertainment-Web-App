import { connectToDatabase } from '../../../lib/database'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
	session: {
		strategy: 'jwt',
	},
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'text', placeholder: 'john@gmail.com' },
				password: { label: 'Password', type: 'password' },
			},

			async authorize(credentials) {
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
