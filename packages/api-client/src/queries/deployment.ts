import { createQuery } from '../utils/create-query'
import { type Deployment } from '@repo/types/deployment'

export const getDeploymentQuery = (deploymentId: string) =>
	createQuery<Deployment>(
		`/api/v1/deployments/${encodeURIComponent(deploymentId)}`
	)
