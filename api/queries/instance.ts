import { createQuery } from '@/api/utils/create-query'
import { type Instance } from '@/types/instance'

export const getInstanceQuery = (instanceId: number) =>
	createQuery<Instance>(`/api/v1/instances/${instanceId}`)
