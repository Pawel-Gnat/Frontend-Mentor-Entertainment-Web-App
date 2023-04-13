import Image from 'next/image'
import { AuthInput } from '../ui/Input/Input'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { AuthButton } from '../ui/Button/Button'

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

export const AuthForm = () => {
	const [isLogin, setIsLogin] = useState(true)
	const [email, setEmail] = useState('')
	const [emailError, setEmailError] = useState('')
	const [password, setPassword] = useState('')
	const [passwordError, setPasswordError] = useState('')
	const [repeatedPassword, setRepeatedPassword] = useState('')
	const [repeatedPasswordError, setRepeatedPasswordError] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()

	function HandleAuthMode() {
		setIsLogin(prevState => !prevState)
	}

	function handleEmail(value: string) {
		setEmail(value)
	}

	function handlePassword(value: string) {
		setPassword(value)
	}

	function handleRepeatedPassword(value: string) {
		setRepeatedPassword(value)
	}

	function handleSignUpErrors(error: { field: string; message: string }) {
		if (error.field === 'email') {
			setEmailError(error.message)

			setTimeout(() => {
				setEmailError('')
			}, 1500)
		}

		if (error.field === 'password') {
			setPasswordError(error.message)

			setTimeout(() => {
				setPasswordError('')
			}, 1500)
		}
	}

	function handleLoginErrors(error: string) {
		if (error === 'User not found') {
			setEmailError(error)

			setTimeout(() => {
				setEmailError('')
			}, 1500)
		}

		if (error === 'Wrong password') {
			setPasswordError(error)

			setTimeout(() => {
				setPasswordError('')
			}, 1500)
		}
	}

	function comparePasswords() {
		if (password !== repeatedPassword) {
			setRepeatedPasswordError('Passwords are not the same')

			setTimeout(() => {
				setRepeatedPasswordError('')
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

		if (isLogin) {
			setIsLoading(true)
			const result = await signIn('credentials', { redirect: false, email, password })

			if (result && !result.error) {
				router.replace('/')
			}

			if (result && result.error) {
				handleLoginErrors(result.error)
			}

			setIsLoading(false)
		} else {
			if (!comparePasswords()) {
				return
			}

			setIsLoading(true)
			const result = await createUser(email, password)

			if (result.error) {
				handleSignUpErrors(result.error)
			}

			if (!result.error) {
				clearForm()
				HandleAuthMode()
			}

			setIsLoading(false)
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
				<h1 className='font-light text-[3.2rem] text-pureWhite'>{isLogin ? 'Login' : 'Sign Up'}</h1>
				<div className='text-[1.5rem] font-light text-pureWhite mt-[4rem]'>
					<form
						className='flex flex-col gap-[2.4rem]'
						onSubmit={submitHandler}>
						<AuthInput
							content='Your email'
							placeholder='Email address'
							value={email}
							onChange={handleEmail}
							error={emailError}
						/>

						<AuthInput
							content='Your password'
							placeholder='Password'
							value={password}
							onChange={handlePassword}
							error={passwordError}
						/>

						{isLogin ? null : (
							<AuthInput
								content='Repeat password'
								placeholder='Repeat password'
								value={repeatedPassword}
								onChange={handleRepeatedPassword}
								error={repeatedPasswordError}
							/>
						)}

						<AuthButton
							isLoading={isLoading}
							content={isLogin ? 'Login to your account' : 'Create an account'}
						/>

						<div className='m-auto'>
							<span className='mr-[1rem]'>{isLogin ? `Don't have an account?` : 'Already have an account?'}</span>
							<button
								type='button'
								className='text-lightRed'
								onClick={HandleAuthMode}>
								{isLogin ? 'Sign Up' : 'Login'}
							</button>
						</div>
					</form>
				</div>
			</div>
		</section>
	)
}
