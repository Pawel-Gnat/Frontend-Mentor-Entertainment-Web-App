import { connectToDatabase } from '../../../lib/database'
import { NextApiRequest, NextApiResponse } from 'next/types'

async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		return
	}

	const data = req.body
	const { email, password } = data

	if (!email || !email.includes('@') || !password) {
		res.status(422).json({ message: 'Invalid input - check your password or email' })
		return
	}

	const client = await connectToDatabase()
	const db = client.db()

	const existingUser = await db.collection('users').findOne({ email: email })

	if (existingUser) {
		res.status(422).json({ message: 'User exists already' })
		client.close()
		return
	}

	const result = await db.collection('users').insertOne({
		email: email,
		password: password,
	})

	res.status(201).json({ message: 'Created user' })
	client.close()
}

export default handler
