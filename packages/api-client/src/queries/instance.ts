import { createQuery } from '../utils/create-query'
import { type InstanceDetails } from '@repo/types/instance'

export const getInstanceQuery = (instanceId: number) =>
	createQuery<InstanceDetails>(`/api/v1/instances/${instanceId}`)
