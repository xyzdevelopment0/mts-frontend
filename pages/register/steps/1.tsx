import { AuthHeadline } from '@/components/auth-headline'
import Link from 'next/link'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Progress } from '../components/progress'
import { useRegister } from '../store'

export const RegisterStep1 = () => {
	const { email, password, set, nextStep } = useRegister()

	return (
		<div className='col-center w-full max-w-[22rem] gap-8'>
			<Progress step={1} />
			<AuthHeadline
				title='Регистрация'
				description='Управляйте облачной инфраструктурой в одном месте.'
			/>
			<form
				className='col w-full gap-6'
				onSubmit={event => {
					event.preventDefault()
					nextStep()
				}}
			>
				<div className='col gap-3'>
					<Input
						autoFocus
						autoComplete='email'
						placeholder='Электронная почта'
						type='email'
						value={email}
						onChange={event => set({ email: event.target.value })}
						required
					/>
					<Input
						autoComplete='new-password'
						placeholder='Пароль'
						type='password'
						value={password}
						onChange={event => set({ password: event.target.value })}
						required
					/>
				</div>
				<Button className='w-full' type='submit'>
					Продолжить
				</Button>
			</form>
			<p className='text-fg-2 text-sm'>
				Уже есть аккаунт?{' '}
				<Link className='text-purple-4' href='/login'>
					Войти
				</Link>
			</p>
		</div>
	)
}
