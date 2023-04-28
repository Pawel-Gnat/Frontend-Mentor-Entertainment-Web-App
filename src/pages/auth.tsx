import Image from 'next/image'
import { AuthForm } from '../components/auth/AuthForm'
import { getSession } from 'next-auth/react'
import { GetServerSidePropsContext } from 'next'
import { useState } from 'react'

export default function AuthPage() {
	const [isLogin, setIsLogin] = useState(true)

	const loginHandler = () => {
		setIsLogin(prev => !prev)
	}

	return (
		<div className='flex flex-col items-center justify-center gap-[8rem] min-h-[90vh] pr-[1.6rem] md:pr-[2.4rem] xl:min-h-[90vh] xl:pr-[3.6rem] xl:mr-[13.6rem]'>
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
					<AuthForm
						isLogin={isLogin}
						loginHandler={loginHandler}
					/>
				</div>
			</div>
		</div>
	)
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
	const session = await getSession({ req: context.req })

	if (session) {
		return {
			redirect: {
				destination: '/',
				permament: false,
			},
		}
	}

	return {
		props: { session },
	}
}
