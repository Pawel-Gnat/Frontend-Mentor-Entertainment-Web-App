import { AuthInput } from '../ui/Input/AuthInput'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { AuthButton } from '../ui/Button/AuthButton'
import { useNotification } from '../../hooks/useNotification'
import { Notification } from '../ui/Notification/Notification'

export const AuthForm = (props: { isLogin: boolean; loginHandler: () => void }) => {
	const [formData, setFormData] = useState({
		email: '',
		emailError: '',
		password: '',
		passwordError: '',
		repeatedPassword: '',
		repeatedPasswordError: '',
		isLoading: false,
	})
	const { notification, handleNotification } = useNotification()
	const router = useRouter()

	function handleEmail(value: string) {
		setFormData(prevState => ({ ...prevState, email: value }))
	}

	function handlePassword(value: string) {
		setFormData(prevState => ({ ...prevState, password: value }))
	}

	function handleRepeatedPassword(value: string) {
		setFormData(prevState => ({ ...prevState, repeatedPassword: value }))
	}

	function handleSignUpErrors(error: { field: string; message: string }) {
		if (error.field === 'email') {
			setFormData(prevState => ({ ...prevState, emailError: error.message }))

			setTimeout(() => {
				setFormData(prevState => ({ ...prevState, emailError: '' }))
			}, 1500)
		}

		if (error.field === 'password') {
			setFormData(prevState => ({ ...prevState, passwordError: error.message }))

			setTimeout(() => {
				setFormData(prevState => ({ ...prevState, passwordError: '' }))
			}, 1500)
		}
	}

	function handleLoginErrors(error: string) {
		if (error === 'User not found') {
			setFormData(prevState => ({ ...prevState, emailError: error }))

			setTimeout(() => {
				setFormData(prevState => ({ ...prevState, emailError: '' }))
			}, 1500)
		}

		if (error === 'Wrong password') {
			setFormData(prevState => ({ ...prevState, passwordError: error }))

			setTimeout(() => {
				setFormData(prevState => ({ ...prevState, passwordError: '' }))
			}, 1500)
		}
	}

	function comparePasswords() {
		if (formData.password !== formData.repeatedPassword) {
			setFormData(prevState => ({ ...prevState, repeatedPasswordError: 'Passwords are not the same' }))

			setTimeout(() => {
				setFormData(prevState => ({ ...prevState, repeatedPasswordError: '' }))
			}, 1500)

			return false
		}

		return true
	}

	function clearForm() {
		handleEmail('')
		handlePassword('')
		handleRepeatedPassword('')
	}

	async function createUser(email: string, password: string) {
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

	async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const { email, password } = formData

		if (props.isLogin) {
			setFormData(prevState => ({ ...prevState, isLoading: true }))
			const result = await signIn('credentials', { redirect: false, email, password })

			if (result && !result.error) {
				router.replace('/')
			}

			if (result && result.error) {
				handleLoginErrors(result.error)
			}

			setFormData(prevState => ({ ...prevState, isLoading: false }))
		} else {
			if (!comparePasswords()) {
				return
			}

			setFormData(prevState => ({ ...prevState, isLoading: true }))
			const result = await createUser(email, password)

			if (result.error) {
				handleSignUpErrors(result.error)
			}

			if (!result.error) {
				clearForm()
				props.loginHandler()
			}

			if (result.status === 'success') {
				handleNotification(result)
			}

			setFormData(prevState => ({ ...prevState, isLoading: false }))
		}
	}

	return (
		<form
			className='flex flex-col gap-[2.4rem]'
			autoComplete='off'
			onSubmit={submitHandler}>
			<AuthInput
				content='Your email'
				placeholder='Email address'
				value={formData.email}
				onChange={handleEmail}
				error={formData.emailError}
			/>

			<AuthInput
				content='Your password'
				placeholder='Password'
				value={formData.password}
				onChange={handlePassword}
				error={formData.passwordError}
				type='password'
			/>

			{props.isLogin || (
				<AuthInput
					content='Repeat password'
					placeholder='Repeat password'
					value={formData.repeatedPassword}
					onChange={handleRepeatedPassword}
					error={formData.repeatedPasswordError}
					type='password'
				/>
			)}

			<AuthButton
				isLoading={formData.isLoading}
				content={props.isLogin ? 'Login to your account' : 'Create an account'}
			/>

			<div className='m-auto'>
				<span className='mr-[1rem]'>{props.isLogin ? `Don't have an account?` : 'Already have an account?'}</span>
				<button
					type='button'
					className='text-lightRed'
					onClick={props.loginHandler}>
					{props.isLogin ? 'Sign Up' : 'Login'}
				</button>
			</div>
			{notification.active && (
				<Notification
					message={notification.message}
					status={notification.status}
				/>
			)}
		</form>
	)
}
