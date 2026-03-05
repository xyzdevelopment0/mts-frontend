import {
	getAdminBillingUsageQuery,
	getAdminDeploymentsQuery,
	getAdminInstancesQuery,
	getAdminOverviewQuery,
	getAdminTenantsQuery,
	getAdminUsersQuery,
} from '@repo/api-client/queries/admin'
import { BillingUsageTable } from './components/billing-usage-table'
import { DeploymentsTable } from './components/deployments-table'
import { FilterBar } from './components/filter-bar'
import { InstancesTable } from './components/instances-table'
import { OverviewCards } from './components/overview-cards'
import { TenantsTable } from './components/tenants-table'
import { UsersTable } from './components/users-table'
import {
	resolveHomeFilters,
	toOptionalPositiveInteger,
	type HomeSearchParams,
} from './utils'

type HomeProps = {
	searchParams?: HomeSearchParams
}

const LIST_LIMIT = 50

export const Home = async ({ searchParams = {} }: HomeProps) => {
	const filters = resolveHomeFilters(searchParams)
	const tenantId = toOptionalPositiveInteger(filters.tenantId)

	const [
		overviewResponse,
		tenantsResponse,
		usersResponse,
		instancesResponse,
		deploymentsResponse,
		billingResponse,
	] = await Promise.all([
		getAdminOverviewQuery(),
		getAdminTenantsQuery({
			limit: LIST_LIMIT,
			offset: 0,
		}),
		getAdminUsersQuery({
			tenant_id: tenantId,
			role: filters.userRole || undefined,
			limit: LIST_LIMIT,
			offset: 0,
		}),
		getAdminInstancesQuery({
			tenant_id: tenantId,
			status: filters.instanceStatus || undefined,
			limit: LIST_LIMIT,
			offset: 0,
		}),
		getAdminDeploymentsQuery({
			tenant_id: tenantId,
			status: filters.deploymentStatus || undefined,
			limit: LIST_LIMIT,
			offset: 0,
		}),
		getAdminBillingUsageQuery({
			limit: LIST_LIMIT,
			offset: 0,
		}),
	])

	return (
		<main className='col flex-1 gap-4'>
			<div className='col gap-1'>
				<h1 className='text-fg-4 text-2xl font-semibold'>Админ-панель</h1>
				<p className='text-fg-2'>
					Единый обзор платформы с управлением арендаторами, пользователями и
					инфраструктурой.
				</p>
			</div>
			<OverviewCards
				overview={overviewResponse.ok ? overviewResponse.data : null}
				status={overviewResponse.status}
			/>
			<FilterBar filters={filters} />
			<TenantsTable
				items={tenantsResponse.ok ? tenantsResponse.data : null}
				status={tenantsResponse.status}
			/>
			<UsersTable
				items={usersResponse.ok ? usersResponse.data : null}
				status={usersResponse.status}
			/>
			<InstancesTable
				items={instancesResponse.ok ? instancesResponse.data : null}
				status={instancesResponse.status}
			/>
			<DeploymentsTable
				items={deploymentsResponse.ok ? deploymentsResponse.data : null}
				status={deploymentsResponse.status}
			/>
			<BillingUsageTable
				items={billingResponse.ok ? billingResponse.data : null}
				status={billingResponse.status}
			/>
		</main>
	)
}
