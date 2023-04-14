import { AuthInput } from '../ui/Input/Input'
import { AuthButton } from '../ui/Button/Button'
import { useState } from 'react'

export const ProfileForm = () => {
	const [passwordData, setPasswordData] = useState({
		currentPassword: '',
		newPassword: '',
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

	function handleChangePasswordErrors(error: { field: string; message: string }) {
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
	}

	function submitHandler(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		changePasswordHandler(passwordData)
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

				<AuthButton content='Change password' />
			</form>
		</div>
	)
}
