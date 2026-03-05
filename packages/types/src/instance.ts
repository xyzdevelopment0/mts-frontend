export type InstanceStatus =
	| 'PROVISIONING'
	| 'RUNNING'
	| 'STOPPED'
	| 'ERROR'
	| 'TERMINATED'

export interface CreateInstancePayload {
	name: string
	flavor_id: number
	image_id: number
}

interface InstanceSshAccess {
	ssh_username: string
	ssh_host: string
	ssh_port: number
}

export interface CreateInstanceResponse extends InstanceSshAccess {
	instance_id: number
	provisioning_operation_id: number
	status: 'PROVISIONING'
	ssh_password: string
	postgres_username: string
	postgres_password: string
}

export interface Instance extends InstanceSshAccess {
	id: number
	tenant_id: number
	name: string
	flavor_id: number
	image_id: number
	status: InstanceStatus
	ip_address: string
	postgres_username: string
	created_at: string
	updated_at: string
	deleted_at: string | null
}

export interface InstanceDetails extends Instance {}
