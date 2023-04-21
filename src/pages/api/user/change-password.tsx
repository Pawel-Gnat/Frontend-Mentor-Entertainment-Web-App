import { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../../lib/database'
import { Session, getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'

async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'PATCH') {
		return
	}

	const session: Session | null = await getServerSession(req, res, authOptions)

	if (!session) {
		res.status(401).json({ message: 'User is not authenticated' })
		return
	}

	const userEmail = session.user?.email
	const oldPassword = req.body.currentPassword
	const newPassword = req.body.newPassword

	const client = await connectToDatabase()
	const userCollection = client.db().collection('users')
	const loggedUser = await userCollection.findOne({ email: userEmail })

	if (!loggedUser) {
		res.status(404).json({ message: 'User not found' })
		client.close()
		return
	}

	const userPassword = loggedUser.password

	if (userPassword !== oldPassword) {
		res.status(403).json({ message: 'Wrong password', field: 'currentPassword' })
		client.close()
		return
	}

	if (newPassword.length < 4) {
		res.status(403).json({ message: 'Minimum 4 characters long', field: 'newPassword' })
		client.close()
		return
	}

	const result = await userCollection.updateOne({ email: userEmail }, { $set: { password: newPassword } })

	client.close()
	res.status(200).json({ message: 'Password updated', status: 'success' })
}

export default handler
