import { createQuery } from '@/api/utils/create-query'
import { type BillingUsage } from '@/types/billing/usage'

export const getBillingUsageQuery = () =>
	createQuery<BillingUsage>('/api/v1/billing/usage')
