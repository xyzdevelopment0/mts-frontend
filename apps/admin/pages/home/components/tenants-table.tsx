import { type AdminTenant } from '@repo/types/admin'
import { Panel } from './panel'
import { SectionError } from './section-error'
import {
	formatCredits,
	formatDateTime,
	formatInteger,
} from '@/pages/home/utils'

type TenantsTableProps = {
	items: AdminTenant[] | null
	status: number
}

export const TenantsTable = ({ items, status }: TenantsTableProps) => {
	if (!items) {
		return (
			<Panel title='Арендаторы' description='Первые 50 записей.'>
				<SectionError status={status} />
			</Panel>
		)
	}

	if (items.length === 0) {
		return (
			<Panel title='Арендаторы' description='Первые 50 записей.'>
				<p className='text-fg-3 text-sm'>Список арендаторов пуст.</p>
			</Panel>
		)
	}

	return (
		<Panel
			title='Арендаторы'
			description={`Показано: ${formatInteger(items.length)}.`}
		>
			<div className='bg-bg-1 overflow-x-auto rounded-xl'>
				<table className='min-w-full text-sm'>
					<thead className='text-fg-2 bg-bg-3 text-left'>
						<tr>
							<th className='px-3 py-2.5 font-medium'>ID</th>
							<th className='px-3 py-2.5 font-medium'>Название</th>
							<th className='px-3 py-2.5 font-medium'>План</th>
							<th className='px-3 py-2.5 font-medium'>Баланс</th>
							<th className='px-3 py-2.5 font-medium'>Создан</th>
						</tr>
					</thead>
					<tbody>
						{items.map(item => (
							<tr key={item.id} className='border-bg-3 border-t'>
								<td className='px-3 py-3 tabular-nums'>{item.id}</td>
								<td className='text-fg-4 px-3 py-3 font-medium'>{item.name}</td>
								<td className='px-3 py-3 tabular-nums'>{item.plan_id}</td>
								<td className='px-3 py-3'>
									{formatCredits(item.balance_credits)}
								</td>
								<td className='px-3 py-3'>{formatDateTime(item.created_at)}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</Panel>
	)
}
