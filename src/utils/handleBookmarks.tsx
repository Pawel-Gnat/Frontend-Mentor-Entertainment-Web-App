export async function handleBookmarks(method: string = 'GET', title: string = '') {
	if (title) {
		const response = await fetch('/api/user/handle-bookmarks', {
			method: method,
			body: JSON.stringify({ title }),
			headers: {
				'Content-Type': 'application/json',
			},
		})

		const data = await response.json()

		if (!response.ok) {
			return {
				error: {
					message: data.message,
					field: data.field,
				},
			}
		}

		return data
	} else {
		const response = await fetch('/api/user/handle-bookmarks')

		const data = await response.json()

		if (!response.ok) {
			return {
				error: {
					message: data.message,
					field: data.field,
				},
			}
		}

		return data
	}
}
