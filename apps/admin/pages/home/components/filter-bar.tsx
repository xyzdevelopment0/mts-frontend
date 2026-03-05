import { Button } from '@repo/ui/button'
import { Input } from '@repo/ui/input'
import { cn } from '@repo/utils/cn'
import {
	ADMIN_INSTANCE_STATUS_FILTERS,
	ADMIN_USER_ROLE_FILTERS,
	formatStatusLabel,
	type HomeFilters,
} from '@/pages/home/utils'

type FilterBarProps = {
	filters: HomeFilters
}

const selectClassName = cn(
	'h-10 rounded-lg px-3 text-sm',
	'bg-bg-1 text-fg-4 border border-transparent',
	'focus:ring-purple-2 focus:ring-2 focus:outline-none'
)

export const FilterBar = ({ filters }: FilterBarProps) => (
	<section className='col bg-bg-2 gap-3 rounded-2xl p-4'>
		<div className='col gap-0.5'>
			<h2 className='text-fg-4 text-base font-semibold'>Фильтры</h2>
			<p className='text-fg-2 text-sm'>
				Применяются к спискам пользователей, инстансов и деплоев.
			</p>
		</div>
		<form className='grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5'>
			<Input
				name='tenant_id'
				type='number'
				min={1}
				placeholder='ID арендатора'
				defaultValue={filters.tenantId}
				className='bg-bg-1 h-10'
			/>
			<select
				name='user_role'
				defaultValue={filters.userRole}
				className={selectClassName}
			>
				<option value=''>Все роли</option>
				{ADMIN_USER_ROLE_FILTERS.map(role => (
					<option key={role} value={role}>
						{role}
					</option>
				))}
			</select>
			<select
				name='instance_status'
				defaultValue={filters.instanceStatus}
				className={selectClassName}
			>
				<option value=''>Все статусы инстансов</option>
				{ADMIN_INSTANCE_STATUS_FILTERS.map(status => (
					<option key={status} value={status}>
						{formatStatusLabel(status)}
					</option>
				))}
			</select>
			<Input
				name='deployment_status'
				type='text'
				placeholder='Статус деплоя'
				defaultValue={filters.deploymentStatus}
				className='bg-bg-1 h-10'
			/>
			<div className='row-center w-full justify-between md:col-span-2 xl:col-span-5'>
				<Button type='submit' size='sm' className='ml-auto'>
					Применить
				</Button>
			</div>
		</form>
	</section>
)
