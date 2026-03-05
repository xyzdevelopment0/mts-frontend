'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { registerRequest } from '@repo/api-client/endpoints/auth'
import { Button } from '@repo/ui/button'
import { Headline } from '@repo/ui/headline'
import { Input } from '@repo/ui/input'
import { Stepper } from '@repo/ui/stepper'

type RegisterProps = {
	successHref: string
}

type RegisterStep = 1 | 2 | 3

const REGISTER_STEPS = [{ id: 1 }, { id: 2 }, { id: 3 }] as const

const isAbsoluteHref = (href: string) =>
	href.startsWith('http://') || href.startsWith('https://')

const navigateTo = (href: string, push: (href: string) => void) => {
	if (isAbsoluteHref(href)) {
		window.location.assign(href)
		return
	}

	push(href)
}

const RegisterAvatar = ({ letter }: { letter: string }) => (
	<div className='center border-gray-2 size-28 rounded-full border-2 border-dashed'>
		<div className='bg-gray-2 text-fg-2 center size-24 rounded-full text-6xl'>
			{letter}
		</div>
	</div>
)

export const Register = ({ successHref }: RegisterProps) => {
	const router = useRouter()
	const [step, setStep] = useState<RegisterStep>(1)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [name, setName] = useState('')
	const [tenantName, setTenantName] = useState('')
	const [isPending, setIsPending] = useState(false)
	const [error, setError] = useState('')
	const nextStep = () =>
		setStep(prev => (prev === 3 ? 3 : ((prev + 1) as RegisterStep)))
	const profileInitial = email.trim().charAt(0).toUpperCase() || 'C'
	const workspaceInitial =
		tenantName.trim().charAt(0).toUpperCase() ||
		email.trim().charAt(0).toUpperCase() ||
		'W'

	return (
		<div className='col-center w-full max-w-[22rem] gap-8'>
			<Stepper items={REGISTER_STEPS} activeId={step} />
			{step === 1 ? (
				<>
					<Headline
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
				</>
			) : null}
			{step === 2 ? (
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
							onChange={event => setName(event.target.value)}
							required
						/>
						<Button className='w-full' type='submit'>
							Продолжить
						</Button>
					</form>
				</>
			) : null}
			{step === 3 ? (
				<>
					<Headline
						title='Настройте рабочее пространство'
						description='Добавьте название и аватар рабочего пространства.'
					/>
					<RegisterAvatar letter={workspaceInitial} />
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
									navigateTo(successHref, router.push)
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
						<Input
							autoFocus
							placeholder='Название рабочего пространства'
							type='text'
							value={tenantName}
							onChange={event => setTenantName(event.target.value)}
							required
						/>
						<div className='col gap-2'>
							<Button className='w-full' type='submit' disabled={isPending}>
								{isPending ? 'Создаем...' : 'Завершить'}
							</Button>
							{error ? (
								<p className='text-center text-sm text-red-500'>{error}</p>
							) : null}
						</div>
					</form>
				</>
			) : null}
		</div>
	)
}
