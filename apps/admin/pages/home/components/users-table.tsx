import { type AdminUser } from '@repo/types/admin'
import { cn } from '@repo/utils/cn'
import { Panel } from './panel'
import { SectionError } from './section-error'
import { UserRoleAction } from './user-role-action'
import {
	USER_ROLE_LABELS,
	formatDateTime,
	formatInteger,
} from '@/pages/home/utils'

type UsersTableProps = {
	items: AdminUser[] | null
	status: number
}

export const UsersTable = ({ items, status }: UsersTableProps) => {
	if (!items) {
		return (
			<Panel title='Пользователи' description='С учетом активных фильтров.'>
				<SectionError status={status} />
			</Panel>
		)
	}

	if (items.length === 0) {
		return (
			<Panel title='Пользователи' description='С учетом активных фильтров.'>
				<p className='text-fg-3 text-sm'>Пользователи не найдены.</p>
			</Panel>
		)
	}

	return (
		<Panel
			title='Пользователи'
			description={`Показано: ${formatInteger(items.length)}.`}
		>
			<div className='bg-bg-1 overflow-x-auto rounded-xl'>
				<table className='min-w-full text-sm'>
					<thead className='text-fg-2 bg-bg-3 text-left'>
						<tr>
							<th className='px-3 py-2.5 font-medium'>Пользователь</th>
							<th className='px-3 py-2.5 font-medium'>Tenant ID</th>
							<th className='px-3 py-2.5 font-medium'>Роль</th>
							<th className='px-3 py-2.5 font-medium'>Статус</th>
							<th className='px-3 py-2.5 font-medium'>Создан</th>
							<th className='px-3 py-2.5 text-right font-medium'>Действие</th>
						</tr>
					</thead>
					<tbody>
						{items.map(item => (
							<tr key={item.id} className='border-bg-3 border-t align-top'>
								<td className='px-3 py-3'>
									<div className='col gap-0.5'>
										<span className='text-fg-4 font-medium'>
											{item.name || '—'}
										</span>
										<span className='text-fg-2 text-xs'>{item.email}</span>
									</div>
								</td>
								<td className='px-3 py-3 tabular-nums'>{item.tenant_id}</td>
								<td className='px-3 py-3'>{USER_ROLE_LABELS[item.role]}</td>
								<td className='px-3 py-3'>
									<span
										className={cn(
											'inline-flex rounded-full px-2 py-0.5 text-xs font-medium',
											item.is_active
												? 'bg-green-a2 text-green-4'
												: 'bg-gray-a2 text-fg-2'
										)}
									>
										{item.is_active ? 'Активен' : 'Отключен'}
									</span>
								</td>
								<td className='px-3 py-3'>{formatDateTime(item.created_at)}</td>
								<td className='px-3 py-3 text-right'>
									<UserRoleAction userId={item.id} role={item.role} />
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</Panel>
	)
}
