export interface AdminDeploymentAttempt {
	attempt: number
	status: string
	technology: string | null
	dockerfile: string | null
	build_error: string | null
	prompt_context_chars: number
	started_at: string | null
	finished_at: string | null
}

export interface AdminDeployment {
	deployment_id: string
	tenant_id: number
	github_url: string
	status: string
	docker_image: string | null
	container_id: string | null
	container_name: string | null
	container_port: number | null
	public_url: string | null
	error_message: string | null
	current_attempt: number
	max_attempts: number
	attempts: AdminDeploymentAttempt[]
	created_at: string
	updated_at: string
}
