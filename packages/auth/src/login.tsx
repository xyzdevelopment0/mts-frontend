'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { loginRequest } from '@repo/api-client/endpoints/auth'
import { Button } from '@repo/ui/button'
import { Headline } from '@repo/ui/headline'
import { Input } from '@repo/ui/input'
import { navigateTo, resolveSuccessHref } from './success-href'

type LoginProps = {
	successHref: string
	superuserSuccessHref?: string
}

export const Login = ({ successHref, superuserSuccessHref }: LoginProps) => {
	const router = useRouter()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [isPending, setIsPending] = useState(false)
	const [error, setError] = useState('')

	return (
		<div className='col-center w-full max-w-[22rem] gap-8'>
			<Headline
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
							navigateTo(
								resolveSuccessHref({
									data: response.data,
									successHref,
									superuserSuccessHref,
								}),
								router.push
							)
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
						onChange={event => setEmail(event.target.value)}
						required
					/>
					<Input
						autoComplete='current-password'
						placeholder='Пароль'
						type='password'
						value={password}
						onChange={event => setPassword(event.target.value)}
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
