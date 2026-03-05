export const ADMIN_INSTANCE_STATUSES = [
	'PROVISIONING',
	'RUNNING',
	'STOPPED',
	'ERROR',
	'TERMINATED',
] as const

export type AdminInstanceStatus = (typeof ADMIN_INSTANCE_STATUSES)[number]

export interface AdminInstance {
	id: number
	tenant_id: number
	name: string
	flavor_id: number
	image_id: number
	status: AdminInstanceStatus
	ip_address: string
	ssh_host: string
	ssh_port: number
	ssh_username: string
	postgres_username: string
	created_at: string
	updated_at: string
	deleted_at: string | null
}

export interface AdminInstanceActionPayload {
	action: string
}

export interface AdminMessageResponse {
	message: string
}
