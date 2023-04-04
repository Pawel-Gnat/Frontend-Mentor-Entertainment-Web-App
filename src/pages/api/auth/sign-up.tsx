import { connectToDatabase } from '../../../lib/database'

export const handler = async (req, res) => {
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

	const result = await db.collection('users').insertOne({
		email: email,
		password: password,
	})

	res.status(201).json({ message: 'Created user' })
}
