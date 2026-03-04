import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { RegisterAvatar } from '../components/avatar'
import { Headline } from '../components/headline'
import { Progress } from '../components/progress'
import { useRegister } from '../store'

export const RegisterStep3 = () => {
	const { email } = useRegister()
	const workspaceInitial = email.trim().charAt(0).toUpperCase() || 'W'

	return (
		<div className='col-center w-full max-w-[22rem] gap-8'>
			<Progress step={3} />
			<Headline
				title='Настройте рабочее пространство'
				description='Добавьте название и аватар рабочего пространства.'
			/>
			<RegisterAvatar letter={workspaceInitial} />
			<form
				className='col w-full gap-6'
				onSubmit={event => {
					event.preventDefault()
				}}
			>
				<Input
					autoFocus
					placeholder='Название рабочего пространства'
					type='text'
				/>
				<Button className='w-full' type='submit'>
					Завершить
				</Button>
			</form>
		</div>
	)
}
