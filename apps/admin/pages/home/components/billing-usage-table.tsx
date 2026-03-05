import { type AdminBillingUsageItem } from '@repo/types/admin'
import { Panel } from './panel'
import { SectionError } from './section-error'
import {
	formatCredits,
	formatDateTime,
	formatInteger,
} from '@/pages/home/utils'

type BillingUsageTableProps = {
	items: AdminBillingUsageItem[] | null
	status: number
}

export const BillingUsageTable = ({
	items,
	status,
}: BillingUsageTableProps) => {
	if (!items) {
		return (
			<Panel title='Биллинг' description='Первые 50 сводных записей.'>
				<SectionError status={status} />
			</Panel>
		)
	}

	if (items.length === 0) {
		return (
			<Panel title='Биллинг' description='Первые 50 сводных записей.'>
				<p className='text-fg-3 text-sm'>Данные по биллингу не найдены.</p>
			</Panel>
		)
	}

	return (
		<Panel
			title='Биллинг'
			description={`Показано: ${formatInteger(items.length)}.`}
		>
			<div className='bg-bg-1 overflow-x-auto rounded-xl'>
				<table className='min-w-full text-sm'>
					<thead className='text-fg-2 bg-bg-3 text-left'>
						<tr>
							<th className='px-3 py-2.5 font-medium'>Tenant</th>
							<th className='px-3 py-2.5 font-medium'>Tenant ID</th>
							<th className='px-3 py-2.5 font-medium'>Всего начислено</th>
							<th className='px-3 py-2.5 font-medium'>Записей</th>
							<th className='px-3 py-2.5 font-medium'>Последняя запись</th>
						</tr>
					</thead>
					<tbody>
						{items.map(item => (
							<tr key={item.tenant_id} className='border-bg-3 border-t'>
								<td className='text-fg-4 px-3 py-3 font-medium'>
									{item.tenant_name}
								</td>
								<td className='px-3 py-3 tabular-nums'>{item.tenant_id}</td>
								<td className='px-3 py-3'>
									{formatCredits(item.total_charged)}
								</td>
								<td className='px-3 py-3 tabular-nums'>{item.records_count}</td>
								<td className='px-3 py-3'>
									{formatDateTime(item.last_entry_at)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</Panel>
	)
}
