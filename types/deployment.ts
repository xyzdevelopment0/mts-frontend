export const DEPLOYMENT_STATUSES = [
	'analyzing',
	'cloning',
	'generating_dockerfile',
	'building',
	'configuring_access',
	'running',
	'retrying',
	'failed',
	'deleting',
	'deleted',
] as const

export type DeploymentStatus = (typeof DEPLOYMENT_STATUSES)[number]

export const DEPLOYMENT_ATTEMPT_STATUSES = [
	'running',
	'dockerfile_generated',
	'build_succeeded',
	'build_failed',
	'failed',
] as const

export type DeploymentAttemptStatus =
	(typeof DEPLOYMENT_ATTEMPT_STATUSES)[number]

export interface CreateDeploymentPayload {
	github_url: string
	tenant_id: number
}

export interface CreateDeploymentResponse {
	deployment_id: string
	status: string
}

export interface ValidationErrorDetail {
	loc: Array<string | number>
	msg: string
	type: string
}

export interface ValidationErrorResponse {
	detail: ValidationErrorDetail[]
}

export interface DeploymentAttempt {
	attempt: number
	status: DeploymentAttemptStatus | string
	technology: string | null
	dockerfile: string | null
	build_error: string | null
	prompt_context_chars: number | null
	started_at: string | null
	finished_at: string | null
}

export interface Deployment {
	deployment_id: string
	tenant_id: number
	github_url: string
	status: DeploymentStatus | string
	docker_image: string | null
	container_id: string | null
	container_name: string | null
	container_port: number | null
	public_url: string | null
	error_message: string | null
	current_attempt: number
	max_attempts: number
	attempts: DeploymentAttempt[]
	created_at: string
	updated_at: string
}
