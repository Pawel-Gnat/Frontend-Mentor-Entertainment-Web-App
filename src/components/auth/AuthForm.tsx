import Image from 'next/image'
import { AuthInput } from '../ui/Input/AuthInput'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { AuthButton } from '../ui/Button/AuthButton'
import { createUser } from '../../utils/createUser'

export const AuthForm = () => {
	const [formData, setFormData] = useState({
		isLogin: true,
		email: '',
		emailError: '',
		password: '',
		passwordError: '',
		repeatedPassword: '',
		repeatedPasswordError: '',
		isLoading: false,
	})
	const router = useRouter()

	function handleAuthMode() {
		setFormData(prevState => ({ ...prevState, isLogin: !prevState.isLogin }))
	}

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

	async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const { email, password } = formData

		if (formData.isLogin) {
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
				handleAuthMode()
			}

			setFormData(prevState => ({ ...prevState, isLoading: false }))
		}
	}

	return (
		<section className='flex flex-col items-center justify-center gap-[8rem] min-h-[90vh] pr-[1.6rem] md:pr-[2.4rem] xl:min-h-[90vh] xl:pr-[3.6rem] xl:mr-[13.6rem]'>
			<Image
				src='/assets/logo.svg'
				width={25}
				height={20}
				className='w-[25px] h-[20px] md:h-[2.6rem] md:w-[3.2rem]'
				alt=''
				aria-hidden='true'
			/>
			<div className='w-full max-w-[40rem] p-[3.2rem] bg-semiDarkBlue'>
				<h1 className='font-light text-[3.2rem] text-pureWhite'>{formData.isLogin ? 'Login' : 'Sign Up'}</h1>
				<div className='text-[1.5rem] font-light text-pureWhite mt-[4rem]'>
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
						/>

						{formData.isLogin || (
							<AuthInput
								content='Repeat password'
								placeholder='Repeat password'
								value={formData.repeatedPassword}
								onChange={handleRepeatedPassword}
								error={formData.repeatedPasswordError}
							/>
						)}

						<AuthButton
							isLoading={formData.isLoading}
							content={formData.isLogin ? 'Login to your account' : 'Create an account'}
						/>

						<div className='m-auto'>
							<span className='mr-[1rem]'>
								{formData.isLogin ? `Don't have an account?` : 'Already have an account?'}
							</span>
							<button
								type='button'
								className='text-lightRed'
								onClick={handleAuthMode}>
								{formData.isLogin ? 'Sign Up' : 'Login'}
							</button>
						</div>
					</form>
				</div>
			</div>
		</section>
	)
}
