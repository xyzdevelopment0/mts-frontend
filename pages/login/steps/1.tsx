import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { loginRequest } from '@/api/endpoints/auth'
import { AuthHeadline } from '@/components/auth-headline'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { useLogin } from '../store'

export const LoginStep1 = () => {
	const router = useRouter()
	const [isPending, setIsPending] = useState(false)
	const [error, setError] = useState('')
	const { email, password, set } = useLogin()

	return (
		<div className='col-center w-full max-w-[22rem] gap-8'>
			<AuthHeadline
				title='Вход'
				description='Управляйте облачной инфраструктурой в одном месте.'
			/>
			<form
				className='col w-full gap-6'
				onSubmit={async event => {
					event.preventDefault()
					if (isPending) return
					setError('')
					setIsPending(true)

					try {
						const response = await loginRequest({
							email: email.trim(),
							password,
						})

						if (response.ok) {
							router.push('/home')
							return
						}

						setError('Не удалось войти. Проверьте данные и попробуйте снова.')
					} catch {
						setError('Не удалось войти. Проверьте данные и попробуйте снова.')
					} finally {
						setIsPending(false)
					}
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
				<div className='col gap-2'>
					<Button className='w-full' type='submit' disabled={isPending}>
						{isPending ? 'Входим...' : 'Войти'}
					</Button>
					{error ? (
						<p className='text-center text-sm text-red-500'>{error}</p>
					) : null}
				</div>
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
