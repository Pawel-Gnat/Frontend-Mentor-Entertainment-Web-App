import { AuthInput } from '../ui/Input/Input'
import { AuthButton } from '../ui/Button/Button'
import { useState } from 'react'
import { Notification } from '../ui/Notification/Notification'

type Data = {
	field: string
	message: string
	status: string
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
	const [notification, setNotification] = useState({ active: false, message: '', status: '' })

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
		if (result.status === 'success') {
			setPasswordData({ newPassword: '', currentPassword: '', passwordChanged: false })
			handleNotification(result)
		}
	}

	const handleNotification = (result: { message: string; status: string }) => {
		setNotification({ active: true, message: result.message, status: result.status })
		setTimeout(() => {
			setNotification({ active: false, message: '', status: '' })
		}, 3000)
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
				/>

				<AuthButton
					isLoading={isLoading}
					content='Change password'
				/>
			</form>
			{notification.active && (
				<Notification
					message={notification.message}
					status={notification.status}
				/>
			)}
		</div>
	)
}
