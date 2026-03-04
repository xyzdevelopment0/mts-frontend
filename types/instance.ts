export type InstanceStatus =
	| 'PROVISIONING'
	| 'RUNNING'
	| 'STOPPED'
	| 'ERROR'
	| 'TERMINATED'

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
