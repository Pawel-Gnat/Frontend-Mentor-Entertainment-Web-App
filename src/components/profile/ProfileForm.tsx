import { AuthInput } from '../ui/Input/Input'
import { AuthButton } from '../ui/Button/Button'
import { useState } from 'react'

type Data = {
	field: string
	message: string
}

export const ProfileForm = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [passwordData, setPasswordData] = useState({
		currentPassword: '',
		newPassword: '',
		passwordChanged: false,
	})

	const [changePasswordError, setChangePasswordError] = useState({
		currentPassword: '',
		newPassword: '',
	})

	function handleNewPassword(value: string) {
		setPasswordData({ ...passwordData, newPassword: value })
	}

	function handleCurrentPassword(value: string) {
		setPasswordData({ ...passwordData, currentPassword: value })
	}

	function handleChangePasswordErrors(error: Data) {
		if (error.field === 'currentPassword') {
			setChangePasswordError({ ...changePasswordError, currentPassword: error.message })

			setTimeout(() => {
				setChangePasswordError({ ...changePasswordError, currentPassword: '' })
			}, 1500)
		}

		if (error.field === 'newPassword') {
			setChangePasswordError({ ...changePasswordError, newPassword: error.message })

			setTimeout(() => {
				setChangePasswordError({ ...changePasswordError, newPassword: '' })
			}, 1500)
		}
	}

	function clearInputs(result: Data) {
		if (result.field === 'user') {
			setPasswordData({ newPassword: '', currentPassword: '', passwordChanged: true })

			setTimeout(() => {
				setPasswordData({ newPassword: '', currentPassword: '', passwordChanged: false })
			}, 1500)
		}
	}

	async function changePasswordHandler(passwords: { newPassword: string; currentPassword: string }) {
		const response = await fetch('/api/user/change-password', {
			method: 'PATCH',
			body: JSON.stringify(passwords),
			headers: {
				'Content-Type': 'application/json',
			},
		})

		const data = await response.json()
		handleChangePasswordErrors(data)
		clearInputs(data)
	}

	async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		setIsLoading(true)
		await changePasswordHandler(passwordData)
		setIsLoading(false)
	}

	return (
		<div className='text-[1.5rem] font-light text-pureWhite mt-[4rem]'>
			<form
				className='flex flex-col gap-[2.4rem]'
				onSubmit={submitHandler}>
				<AuthInput
					content='Current password'
					placeholder='Current password'
					value={passwordData.currentPassword}
					onChange={handleCurrentPassword}
					error={changePasswordError.currentPassword}
				/>

				<AuthInput
					content='New password'
					placeholder='New password'
					value={passwordData.newPassword}
					onChange={handleNewPassword}
					error={changePasswordError.newPassword}
					success={passwordData.passwordChanged ? 'Password changed' : undefined}
				/>

				<AuthButton
					isLoading={isLoading}
					content='Change password'
				/>
			</form>
		</div>
	)
}
