import { connectToDatabase } from '../../../lib/database'
import { NextApiRequest, NextApiResponse } from 'next/types'

async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		return
	}

	const data = req.body
	const { email, password } = data

	if (!email || !email.includes('@')) {
		res.status(422).json({
			message: 'Invalid email',
			field: 'email',
		})
		return
	}

	if (!password) {
		res.status(422).json({
			message: `Can't be empty`,
			field: 'password',
		})
		return
	}

	const client = await connectToDatabase()
	const db = client.db()

	const existingUser = await db.collection('users').findOne({ email: email })

	if (existingUser) {
		res.status(422).json({ message: 'User exists already', field: 'email' })
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
