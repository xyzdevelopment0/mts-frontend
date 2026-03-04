import { createEndpoint } from '@/api/utils/create-endpoint'
import {
	type CreateInstancePayload,
	type CreateInstanceResponse,
} from '@/types/instance'

export const createInstanceRequest = (payload: CreateInstancePayload) =>
	createEndpoint.postJson<CreateInstanceResponse>('/api/v1/instances', payload)
