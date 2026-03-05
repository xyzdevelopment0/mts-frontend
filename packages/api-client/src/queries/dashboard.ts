import { createQuery } from '../utils/create-query'
import { type Dashboard } from '@repo/types/dashboard'

export const getDashboardUserQuery = async () => {
	const result = await createQuery<Dashboard>('/api/v1/dash/user')
	console.log('/api/v1/dash/user result', result)
	return result
}
