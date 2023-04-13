import { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../../lib/database'
import { getSession } from 'next-auth/react'
import { Session } from 'next-auth'

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const session: Session | null = await getSession({ req: req })

	if (!session) {
		res.status(401).json({ message: 'User is not authenticated' })
		return
	}

	const userEmail = session.user?.email

	const client = await connectToDatabase()
	const userCollection = client.db().collection('users')
	const loggedUser = await userCollection.findOne({ email: userEmail })

	if (!loggedUser) {
		res.status(404).json({ message: 'User not found' })
		client.close()
		return
	}

	client.close()
	res.status(200).json(loggedUser.bookmarks)
}

export default handler
