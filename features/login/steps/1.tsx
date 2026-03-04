import Link from 'next/link'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Headline } from '@/features/register/components/headline'
import { useLogin } from '../store'

export const LoginStep1 = () => {
	const { email, password, set } = useLogin()

	return (
		<div className='col-center w-full max-w-[22rem] gap-8'>
			<Headline
				title='Вход'
				description='Управляйте облачной инфраструктурой в одном месте.'
			/>
			<form
				className='col w-full gap-6'
				onSubmit={event => {
					event.preventDefault()
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
						autoComplete='current-password'
						placeholder='Пароль'
						type='password'
						value={password}
						onChange={event => set({ password: event.target.value })}
						required
					/>
				</div>
				<Button className='w-full' type='submit'>
					Войти
				</Button>
			</form>
			<p className='text-fg-2 text-sm'>
				Нет аккаунта?{' '}
				<Link className='text-purple-4' href='/register'>
					Зарегистрироваться
				</Link>
			</p>
		</div>
	)
}
