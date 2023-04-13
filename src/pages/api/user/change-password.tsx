import { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../../lib/database'
import { getSession } from 'next-auth/react'
import { Session } from 'next-auth'

async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'PATCH') {
		return
	}

	const session: Session | null = await getSession({ req: req })

	if (!session) {
		res.status(401).json({ message: 'User is not authenticated' })
		return
	}

	const userEmail = session.user?.email
	const oldPassword = req.body.oldPassword
	const newPassword = req.body.newPassword

	const client = await connectToDatabase()
	const userCollection = client.db().collection('users')
	const loggedUser = await userCollection.findOne({ email: userEmail })

	if (!loggedUser) {
		res.status(404).json({ message: 'User not found' })
		client.close()
		return
	}

	const currentPassword = loggedUser.password

	if (currentPassword !== oldPassword) {
		res.status(403).json({ message: 'Wrong password' })
		client.close()
		return
	}

	const result = await userCollection.updateOne({ email: userEmail }, { $set: { password: newPassword } })

	client.close()
	res.status(200).json({ message: 'Password updated' })
}

export default handler
