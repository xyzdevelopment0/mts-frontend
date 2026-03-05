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
	ssh_user: string
	ssh_host: string
	ssh_port: number
}

export interface CreateInstanceResponse extends InstanceSshAccess {
	instance_id: number
	provisioning_operation_id: number
	status: 'PROVISIONING'
	ssh_pass: string
}

export interface Instance {
	id: number
	tenant_id: number
	name: string
	flavor_id: number
	image_id: number
	status: InstanceStatus
	ip_address: string
	created_at: string
	updated_at: string
	deleted_at: string | null
}

export interface InstanceDetails extends InstanceSshAccess, Instance {}
