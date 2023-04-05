import { MongoClient } from 'mongodb'

export async function connectToDatabase() {
	const client = await MongoClient.connect(
		'mongodb+srv://pawel:rjK3WI0uy7kHEEx5@cluster0.mpllfxh.mongodb.net/entertainment-web-app?retryWrites=true&w=majority'
	)

	return client
}

