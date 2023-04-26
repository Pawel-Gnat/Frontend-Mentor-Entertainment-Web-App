import { MongoClient } from 'mongodb'

export async function connectToDatabase() {
	const URL = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.mpllfxh.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`

	const client = await MongoClient.connect(URL)

	return client
}