import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { RegisterAvatar } from '../components/avatar'
import { Headline } from '../components/headline'
import { Progress } from '../components/progress'
import { useRegister } from '../store'

export const RegisterStep2 = () => {
	const { email, nextStep } = useRegister()
	const profileInitial = email.trim().charAt(0).toUpperCase() || 'C'

	return (
		<div className='col-center w-full max-w-[22rem] gap-8'>
			<Progress step={2} />
			<Headline
				title='Настройте аккаунт'
				description='Добавьте имя и фото профиля.'
			/>
			<RegisterAvatar letter={profileInitial} />
			<form
				className='col w-full gap-6'
				onSubmit={event => {
					event.preventDefault()
					nextStep()
				}}
			>
				<Input autoFocus placeholder='Ваше имя' type='text' />
				<Button className='w-full' type='submit'>
					Продолжить
				</Button>
			</form>
		</div>
	)
}
