import { createQuery } from '../utils/create-query'
import { type Dashboard } from '@repo/types/dashboard'

export const getDashboardUserQuery = () =>
	createQuery<Dashboard>('/api/v1/dash/user')
