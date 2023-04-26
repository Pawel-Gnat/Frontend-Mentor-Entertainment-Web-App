export async function createUser(email: string, password: string) {
	const response = await fetch('/api/auth/sign-up', {
		method: 'POST',
		body: JSON.stringify({ email, password }),
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
}
