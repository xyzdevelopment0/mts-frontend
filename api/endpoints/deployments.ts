import { createEndpoint } from '@/api/utils/create-endpoint'
import {
	type CreateDeploymentPayload,
	type CreateDeploymentResponse,
	type Deployment,
	type ValidationErrorResponse,
} from '@/types/deployment'

export const createDeploymentRequest = (payload: CreateDeploymentPayload) =>
	createEndpoint.postJson<CreateDeploymentResponse | ValidationErrorResponse>(
		'/api/v1/deployments',
		payload
	)

export const getDeploymentStatusRequest = (deploymentId: string) =>
	createEndpoint.getJson<Deployment | ValidationErrorResponse>(
		`/api/v1/deployments/${deploymentId}`
	)
