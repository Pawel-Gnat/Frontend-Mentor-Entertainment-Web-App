import Image from 'next/image'
// import { useRouter } from 'next/router'
import { AuthInput } from '../ui/Input/Input'
import { useState } from 'react'

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
		throw new Error(data.message || 'Something went wrong!')
	}

	return data
}

export const AuthForm = () => {
	const [isLogin, setIsLogin] = useState(true)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [repeatedPassword, setRepeatedPassword] = useState('')
	// const router = useRouter()

	function switchAuthModeHandler() {
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

	function comparePasswords() {
		if (password !== repeatedPassword) {
			console.log('Passwords are not the same')
			return false
		}

		return true
	}

	async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		if (isLogin) {
			///
		} else {
			if (!comparePasswords()) {
				return
			}

			try {
				const result = await createUser(email, password)
				console.log(result)
			} catch (error) {
				console.log(error)
			}
		}
	}

	return (
		<section className='flex flex-col items-center justify-center gap-[8rem] min-h-screen pr-[1.6rem] md:pr-[2.4rem] xl:min-h-[90vh] xl:pr-[3.6rem] xl:mr-[13.6rem]'>
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
							onChange={handleEmail}
						/>

						<AuthInput
							content='Your password'
							placeholder='Password'
							onChange={handlePassword}
						/>

						{isLogin ? null : (
							<AuthInput
								content='Repeat password'
								placeholder='Repeat password'
								onChange={handleRepeatedPassword}
							/>
						)}

						<button className='font-outfit text-[1.5rem] font-light text-pureWhite w-full p-[1.5rem] mt-[1.6rem] rounded-[0.6rem] bg-lightRed'>
							{isLogin ? 'Login to your account' : 'Create an account'}
						</button>

						<div className='m-auto'>
							<span className='mr-[1rem]'>{isLogin ? `Don't have an account?` : 'Already have an account?'}</span>
							<button
								type='button'
								className='text-lightRed'
								onClick={switchAuthModeHandler}>
								{isLogin ? 'Sign Up' : 'Login'}
							</button>
						</div>
					</form>
				</div>
			</div>
		</section>
	)
}
