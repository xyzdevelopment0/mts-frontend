import { Input } from '@/components/input'

type NameInputProps = {
	value: string
	onChange: (value: string) => void
}

export const NameInput = ({ value, onChange }: NameInputProps) => (
	<div className='col gap-2'>
		<span className='text-fg-4 text-sm font-medium'>Название сервиса</span>
		<Input
			autoFocus
			placeholder='Например, prod-web-01'
			type='text'
			value={value}
			onChange={event => onChange(event.target.value)}
			required
		/>
	</div>
)
