import { Textarea } from '@/components/textarea'
import { Label } from './label'

export const InstanceNotes = () => (
	<section className='col gap-2'>
		<Label>Заметки</Label>
		<Textarea placeholder='Добавьте заметку по сервису' />
	</section>
)
