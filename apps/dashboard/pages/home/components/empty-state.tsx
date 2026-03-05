import { EmptyState } from '@repo/ui/empty-state'
import { Headline } from '@repo/ui/headline'
import { CreateResourceButton } from '@/features/create-resource'
import { InstancesEmptyIllustration } from '@/illustrations'

export const HomeEmptyState = () => (
	<EmptyState
		illustration={<InstancesEmptyIllustration />}
		title={
			<Headline
				title={<span className='text-2xl font-semibold'>Главная</span>}
				description='У вас пока нет сервисов и деплоев. Нажмите «Создать», чтобы начать работу.'
			/>
		}
		description={null}
		action={<CreateResourceButton variant='home' />}
	/>
)
