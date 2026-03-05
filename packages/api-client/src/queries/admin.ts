import { createQuery } from '../utils/create-query'
import {
	type AdminBillingUsageItem,
	type AdminDeployment,
	type AdminInstance,
	type AdminOverview,
	type AdminTenant,
	type AdminUser,
	type AdminUserRole,
} from '@repo/types/admin'

interface ListOptions {
	[key: string]: string | number | boolean | null | undefined
	limit?: number
	offset?: number
}

interface ListUsersOptions extends ListOptions {
	tenant_id?: number
	role?: AdminUserRole
}

interface ListInstancesOptions extends ListOptions {
	tenant_id?: number
	status?: AdminInstance['status']
}

interface ListDeploymentsOptions extends ListOptions {
	tenant_id?: number
	status?: string
}

export const getAdminOverviewQuery = () =>
	createQuery<AdminOverview>('/api/v1/admin/overview')

export const getAdminTenantsQuery = (options: ListOptions = {}) =>
	createQuery<AdminTenant[]>('/api/v1/admin/tenants', {
		params: options,
	})

export const getAdminUsersQuery = (options: ListUsersOptions = {}) =>
	createQuery<AdminUser[]>('/api/v1/admin/users', {
		params: options,
	})

export const getAdminInstancesQuery = (options: ListInstancesOptions = {}) =>
	createQuery<AdminInstance[]>('/api/v1/admin/instances', {
		params: options,
	})

export const getAdminDeploymentsQuery = (
	options: ListDeploymentsOptions = {}
) =>
	createQuery<AdminDeployment[]>('/api/v1/admin/deployments', {
		params: options,
	})

export const getAdminBillingUsageQuery = (options: ListOptions = {}) =>
	createQuery<AdminBillingUsageItem[]>('/api/v1/admin/billing/usage', {
		params: options,
	})
