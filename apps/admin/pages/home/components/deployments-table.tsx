import Link from 'next/link'
import { type AdminDeployment } from '@repo/types/admin'
import { cn } from '@repo/utils/cn'
import { Panel } from './panel'
import { SectionError } from './section-error'
import {
	formatDateTime,
	formatInteger,
	formatStatusLabel,
	getDeploymentStatusTone,
	getGitHubRepositoryLabel,
} from '@/pages/home/utils'

type DeploymentsTableProps = {
	items: AdminDeployment[] | null
	status: number
}

export const DeploymentsTable = ({ items, status }: DeploymentsTableProps) => {
	if (!items) {
		return (
			<Panel title='Деплои' description='С учетом активных фильтров.'>
				<SectionError status={status} />
			</Panel>
		)
	}

	if (items.length === 0) {
		return (
			<Panel title='Деплои' description='С учетом активных фильтров.'>
				<p className='text-fg-3 text-sm'>Деплои не найдены.</p>
			</Panel>
		)
	}

	return (
		<Panel
			title='Деплои'
			description={`Показано: ${formatInteger(items.length)}.`}
		>
			<div className='bg-bg-1 overflow-x-auto rounded-xl'>
				<table className='min-w-full text-sm'>
					<thead className='text-fg-2 bg-bg-3 text-left'>
						<tr>
							<th className='px-3 py-2.5 font-medium'>Репозиторий</th>
							<th className='px-3 py-2.5 font-medium'>Tenant ID</th>
							<th className='px-3 py-2.5 font-medium'>Статус</th>
							<th className='px-3 py-2.5 font-medium'>Попытки</th>
							<th className='px-3 py-2.5 font-medium'>Публичный URL</th>
							<th className='px-3 py-2.5 font-medium'>Обновлен</th>
						</tr>
					</thead>
					<tbody>
						{items.map(item => (
							<tr key={item.deployment_id} className='border-bg-3 border-t'>
								<td className='px-3 py-3'>
									<div className='col gap-0.5'>
										<span className='text-fg-4 font-medium'>
											{getGitHubRepositoryLabel(item.github_url)}
										</span>
										<span className='text-fg-2 text-xs'>
											{item.deployment_id}
										</span>
									</div>
								</td>
								<td className='px-3 py-3 tabular-nums'>{item.tenant_id}</td>
								<td className='px-3 py-3'>
									<div className='row-center gap-2'>
										<span
											className={cn(
												'size-2.5 rounded-full',
												getDeploymentStatusTone(item.status)
											)}
										/>
										<span>{formatStatusLabel(item.status)}</span>
									</div>
								</td>
								<td className='px-3 py-3 tabular-nums'>
									{item.current_attempt}/{item.max_attempts}
								</td>
								<td className='px-3 py-3'>
									{item.public_url ? (
										<Link
											href={item.public_url}
											target='_blank'
											rel='noopener noreferrer'
											className='text-purple-4 underline-offset-2 hover:underline'
										>
											Открыть
										</Link>
									) : (
										<span className='text-fg-2'>—</span>
									)}
								</td>
								<td className='px-3 py-3'>{formatDateTime(item.updated_at)}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</Panel>
	)
}
