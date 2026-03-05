import { createEndpoint } from '../utils/create-endpoint'
import {
	type CreateInstancePayload,
	type CreateInstanceResponse,
} from '@repo/types/instance'

export const createInstanceRequest = (payload: CreateInstancePayload) =>
	createEndpoint.postJson<CreateInstanceResponse>('/api/v1/instances', payload)
