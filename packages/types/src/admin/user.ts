export const ADMIN_USER_ROLES = ['SUPERUSER', 'ADMIN', 'USER'] as const

export type AdminUserRole = (typeof ADMIN_USER_ROLES)[number]

export interface AdminUser {
	id: number
	tenant_id: number
	name: string
	email: string
	role: AdminUserRole
	is_active: boolean
	created_at: string
}
