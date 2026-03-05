import { createQuery } from '../utils/create-query'
import { type BillingUsage } from '@repo/types/billing/usage'

export const getBillingUsageQuery = () =>
	createQuery<BillingUsage>('/api/v1/billing/usage')
