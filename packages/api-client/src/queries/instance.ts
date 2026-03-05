import { createQuery } from '../utils/create-query'
import { type Instance } from '@repo/types/instance'

export const getInstanceQuery = (instanceId: number) =>
	createQuery<Instance>(`/api/v1/instances/${instanceId}`)
