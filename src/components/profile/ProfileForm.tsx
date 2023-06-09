import { AuthInput } from '../ui/Input/AuthInput'
import { AuthButton } from '../ui/Button/AuthButton'
import { useState } from 'react'
import { Notification } from '../ui/Notification/Notification'
import { NotificationType } from '../../types/types'
import { useNotification } from '../../hooks/useNotification'

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
	const { notification, handleNotification } = useNotification()

	function handleNewPassword(value: string) {
		setPasswordData(prevState => ({ ...prevState, newPassword: value }))
	}

	function handleCurrentPassword(value: string) {
		setPasswordData(prevState => ({ ...prevState, currentPassword: value }))
	}

	function handleChangePasswordErrors(error: NotificationType) {
		if (error.field === 'currentPassword') {
			setChangePasswordError(prevState => ({ ...prevState, currentPassword: error.message }))

			setTimeout(() => {
				setChangePasswordError(prevState => ({ ...prevState, currentPassword: '' }))
			}, 1500)
		}

		if (error.field === 'newPassword') {
			setChangePasswordError(prevState => ({ ...prevState, newPassword: error.message }))

			setTimeout(() => {
				setChangePasswordError(prevState => ({ ...prevState, newPassword: '' }))
			}, 1500)
		}
	}

	function clearInputs(result: NotificationType) {
		if (result.status === 'success') {
			setPasswordData(prevState => ({ ...prevState, newPassword: '', currentPassword: '', passwordChanged: false }))
			handleNotification(result)
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
					type='password'
				/>

				<AuthInput
					content='New password'
					placeholder='New password'
					value={passwordData.newPassword}
					onChange={handleNewPassword}
					error={changePasswordError.newPassword}
					type='password'
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
