import { createQuery } from '@/api/utils/create-query'
import { type Dashboard } from '@/types/dashboard'

export const getDashboardUserQuery = () =>
	createQuery<Dashboard>('/api/v1/dash/user')
