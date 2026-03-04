import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { registerRequest } from '@/api/endpoints/auth'
import { Headline } from '@/components/headline'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { RegisterAvatar } from '../components/avatar'
import { useRegister } from '../store'

export const RegisterStep3 = () => {
	const router = useRouter()
	const [isPending, setIsPending] = useState(false)
	const [error, setError] = useState('')
	const { email, password, name, tenantName, set } = useRegister()
	const workspaceInitial =
		tenantName.trim().charAt(0).toUpperCase() ||
		email.trim().charAt(0).toUpperCase() ||
		'W'

	return (
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
				<Input
					autoFocus
					placeholder='Название рабочего пространства'
					type='text'
					value={tenantName}
					onChange={event => set({ tenantName: event.target.value })}
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
	)
}
