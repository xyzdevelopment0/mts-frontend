'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { registerRequest } from '@repo/api-client/endpoints/auth'
import { Button } from '@repo/ui/button'
import { Headline } from '@repo/ui/headline'
import { Input } from '@repo/ui/input'

export const Register = () => {
	const router = useRouter()
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [tenantName, setTenantName] = useState('')
	const [isPending, setIsPending] = useState(false)
	const [error, setError] = useState('')

	return (
		<div className='col-center w-full max-w-[22rem] gap-8'>
			<Headline
				title='Регистрация админа'
				description='Создайте аккаунт для доступа к админ-панели.'
			/>
			<form
				className='col w-full gap-6'
				onSubmit={async event => {
					event.preventDefault()
					if (isPending) return
					setError('')
					setIsPending(true)

					try {
						const response = await registerRequest({
							name: name.trim(),
							email: email.trim(),
							password,
							tenant_name: tenantName.trim(),
						})

						if (response.ok) {
							router.push('/home')
							return
						}

						setError('Не удалось завершить регистрацию. Попробуйте снова.')
					} catch {
						setError('Не удалось завершить регистрацию. Попробуйте снова.')
					} finally {
						setIsPending(false)
					}
				}}
			>
				<div className='col gap-3'>
					<Input
						autoFocus
						placeholder='Ваше имя'
						type='text'
						value={name}
						onChange={event => setName(event.target.value)}
						required
					/>
					<Input
						autoComplete='email'
						placeholder='Электронная почта'
						type='email'
						value={email}
						onChange={event => setEmail(event.target.value)}
						required
					/>
					<Input
						autoComplete='new-password'
						placeholder='Пароль'
						type='password'
						value={password}
						onChange={event => setPassword(event.target.value)}
						required
					/>
					<Input
						placeholder='Название рабочего пространства'
						type='text'
						value={tenantName}
						onChange={event => setTenantName(event.target.value)}
						required
					/>
				</div>
				<div className='col gap-2'>
					<Button className='w-full' type='submit' disabled={isPending}>
						{isPending ? 'Создаем...' : 'Зарегистрироваться'}
					</Button>
					{error ? (
						<p className='text-center text-sm text-red-500'>{error}</p>
					) : null}
				</div>
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
