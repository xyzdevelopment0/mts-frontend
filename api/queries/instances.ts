import { Instance } from '@/types/instance'
import { createQuery } from '@/api/utils/create-query'

export const listInstancesQuery = () =>
	createQuery<Instance[]>('/api/v1/instances')
