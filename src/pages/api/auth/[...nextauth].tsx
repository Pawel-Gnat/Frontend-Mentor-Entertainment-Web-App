import { connectToDatabase } from '../../../utils/databaseConnect'
import NextAuth from 'next-auth/next'
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
	session: {
		strategy: 'jwt',
	},
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email', placeholder: 'example@user.com' },
				password: { label: 'Password', type: 'password', placeholder: 'password' },
			},

			async authorize(credentials) {
				if (!credentials) {
					throw new Error('Credentials not provided')
				}

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
				return { email: user.email, id: 'id' }
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)
