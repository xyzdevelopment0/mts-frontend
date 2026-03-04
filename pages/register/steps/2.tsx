import { Headline } from '@/components/headline'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { RegisterAvatar } from '../components/avatar'
import { useRegister } from '../store'

export const RegisterStep2 = () => {
	const { email, name, set, nextStep } = useRegister()
	const profileInitial = email.trim().charAt(0).toUpperCase() || 'C'

	return (
		<>
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
		</>
	)
}
