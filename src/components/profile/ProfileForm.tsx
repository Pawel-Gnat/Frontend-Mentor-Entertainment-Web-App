import { AuthInput } from '../ui/Input/Input'
import { AuthButton } from '../ui/Button/Button'

export const ProfileForm = () => {
	return (
		<div className='text-[1.5rem] font-light text-pureWhite mt-[4rem]'>
			<form
				className='flex flex-col gap-[2.4rem]'
				// onSubmit={submitHandler}
			>
				<AuthInput
					content='New password'
					placeholder='New password'
					// value={email}
					// onChange={handleEmail}
					// error={emailError}
				/>

				<AuthInput
					content='Current password'
					placeholder='Current password'
					// value={password}
					// onChange={handlePassword}
					// error={passwordError}
				/>

				<AuthButton
					// isLoading={isLoading}
					content='Change password'
				/>
			</form>
		</div>
	)
}
