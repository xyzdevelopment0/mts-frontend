import { type AdminOverview } from '@repo/types/admin'
import { Panel } from './panel'
import { SectionError } from './section-error'
import { formatInteger } from '@/pages/home/utils'

type OverviewCardsProps = {
	overview: AdminOverview | null
	status: number
}

export const OverviewCards = ({ overview, status }: OverviewCardsProps) => {
	if (!overview) {
		return (
			<Panel
				title='Обзор платформы'
				description='Ключевые показатели по арендаторам, пользователям и сервисам.'
			>
				<SectionError status={status} />
			</Panel>
		)
	}

	const cards = [
		{ label: 'Всего арендаторов', value: overview.tenants_total },
		{ label: 'Всего пользователей', value: overview.users_total },
		{ label: 'Администраторов', value: overview.admins_total },
		{ label: 'Суперпользователей', value: overview.superusers_total },
		{ label: 'Всего инстансов', value: overview.instances_total },
		{ label: 'Запущенных инстансов', value: overview.instances_running },
		{ label: 'Всего деплоев', value: overview.deployments_total },
		{ label: 'Активных деплоев', value: overview.deployments_running },
	]

	return (
		<Panel
			title='Обзор платформы'
			description='Ключевые показатели по арендаторам, пользователям и сервисам.'
		>
			<div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4'>
				{cards.map(card => (
					<article key={card.label} className='col bg-bg-1 rounded-xl p-4'>
						<span className='text-fg-2 text-sm'>{card.label}</span>
						<span className='text-fg-4 mt-1 text-2xl font-semibold'>
							{formatInteger(card.value)}
						</span>
					</article>
				))}
			</div>
		</Panel>
	)
}
