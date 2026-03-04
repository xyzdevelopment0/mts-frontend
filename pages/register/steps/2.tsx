import { AuthHeadline } from '@/components/auth-headline'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { RegisterAvatar } from '../components/avatar'
import { Progress } from '../components/progress'
import { useRegister } from '../store'

export const RegisterStep2 = () => {
	const { email, name, set, nextStep } = useRegister()
	const profileInitial = email.trim().charAt(0).toUpperCase() || 'C'

	return (
		<div className='col-center w-full max-w-[22rem] gap-8'>
			<Progress step={2} />
			<AuthHeadline
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
				<Input
					autoFocus
					placeholder='Ваше имя'
					type='text'
					value={name}
					onChange={event => set({ name: event.target.value })}
					required
				/>
				<Button className='w-full' type='submit'>
					Продолжить
				</Button>
			</form>
		</div>
	)
}
