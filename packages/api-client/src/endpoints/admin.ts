import { createEndpoint } from '../utils/create-endpoint'
import {
	type AdminInstance,
	type AdminInstanceActionPayload,
	type AdminMessageResponse,
	type AdminUser,
} from '@repo/types/admin'

const encodeId = (value: number) => encodeURIComponent(String(value))

export const promoteAdminUserRequest = (userId: number) =>
	createEndpoint.postJson<AdminUser>(
		`/api/v1/admin/users/${encodeId(userId)}/promote`,
		{}
	)

export const demoteAdminUserRequest = (userId: number) =>
	createEndpoint.postJson<AdminUser>(
		`/api/v1/admin/users/${encodeId(userId)}/demote`,
		{}
	)

export const performAdminInstanceActionRequest = (
	instanceId: number,
	payload: AdminInstanceActionPayload
) =>
	createEndpoint.postJson<AdminInstance>(
		`/api/v1/admin/instances/${encodeId(instanceId)}/action`,
		payload
	)

export const deleteAdminInstanceRequest = (instanceId: number) =>
	createEndpoint.deleteJson<AdminMessageResponse>(
		`/api/v1/admin/instances/${encodeId(instanceId)}`
	)
