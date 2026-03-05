import { type AdminInstance } from '@repo/types/admin'
import { cn } from '@repo/utils/cn'
import {
	INSTANCE_STATUS_DOT_COLORS,
	INSTANCE_STATUS_LABELS,
} from '@repo/utils/instance-status'
import { InstanceRowActions } from './instance-row-actions'
import { Panel } from './panel'
import { SectionError } from './section-error'
import { formatDateTime, formatInteger } from '@/pages/home/utils'

type InstancesTableProps = {
	items: AdminInstance[] | null
	status: number
}

export const InstancesTable = ({ items, status }: InstancesTableProps) => {
	if (!items) {
		return (
			<Panel title='Инстансы' description='С учетом активных фильтров.'>
				<SectionError status={status} />
			</Panel>
		)
	}

	if (items.length === 0) {
		return (
			<Panel title='Инстансы' description='С учетом активных фильтров.'>
				<p className='text-fg-3 text-sm'>Инстансы не найдены.</p>
			</Panel>
		)
	}

	return (
		<Panel
			title='Инстансы'
			description={`Показано: ${formatInteger(items.length)}.`}
		>
			<div className='bg-bg-1 overflow-x-auto rounded-xl'>
				<table className='min-w-full text-sm'>
					<thead className='text-fg-2 bg-bg-3 text-left'>
						<tr>
							<th className='px-3 py-2.5 font-medium'>Инстанс</th>
							<th className='px-3 py-2.5 font-medium'>Tenant ID</th>
							<th className='px-3 py-2.5 font-medium'>Статус</th>
							<th className='px-3 py-2.5 font-medium'>SSH</th>
							<th className='px-3 py-2.5 font-medium'>Создан</th>
							<th className='px-3 py-2.5 text-right font-medium'>Действия</th>
						</tr>
					</thead>
					<tbody>
						{items.map(item => (
							<tr key={item.id} className='border-bg-3 border-t align-top'>
								<td className='px-3 py-3'>
									<div className='col gap-0.5'>
										<span className='text-fg-4 font-medium'>{item.name}</span>
										<span className='text-fg-2 text-xs'>
											{item.ip_address || 'IP не назначен'}
										</span>
									</div>
								</td>
								<td className='px-3 py-3 tabular-nums'>{item.tenant_id}</td>
								<td className='px-3 py-3'>
									<div className='row-center gap-2'>
										<span
											className={cn(
												'size-2.5 rounded-full',
												INSTANCE_STATUS_DOT_COLORS[item.status]
											)}
										/>
										<span>{INSTANCE_STATUS_LABELS[item.status]}</span>
									</div>
								</td>
								<td className='px-3 py-3 text-xs'>
									<div className='col gap-0.5'>
										<span>{item.ssh_host || '—'}</span>
										<span className='text-fg-2'>
											{item.ssh_username || '—'}:{item.ssh_port || '—'}
										</span>
									</div>
								</td>
								<td className='px-3 py-3'>{formatDateTime(item.created_at)}</td>
								<td className='px-3 py-3 text-right'>
									<InstanceRowActions
										instanceId={item.id}
										status={item.status}
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</Panel>
	)
}
