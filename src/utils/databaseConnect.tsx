import { MongoClient } from 'mongodb'

export async function connectToDatabase() {
	const URL = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTERNAME}.mpllfxh.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`

	const client = await MongoClient.connect(URL)

	return client
}
