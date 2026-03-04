import { createEndpoint } from '@/api/utils/create-endpoint'

interface LoginPayload {
	email: string
	password: string
}

interface RegisterPayload {
	name: string
	email: string
	password: string
	tenant_name: string
}

type AuthResponse = Record<string, unknown>

const toEmailForm = (payload: LoginPayload) => {
	const body = new URLSearchParams()
	body.set('email', payload.email)
	body.set('password', payload.password)
	return body
}

const toUsernameForm = (payload: LoginPayload) => {
	const body = new URLSearchParams()
	body.set('username', payload.email)
	body.set('password', payload.password)
	return body
}

export const loginRequest = async (payload: LoginPayload) => {
	const jsonResponse = await createEndpoint.postJson<AuthResponse>(
		'/api/v1/auth/login',
		payload
	)

	if (
		jsonResponse.ok ||
		!createEndpoint.isRetryableContentStatus(jsonResponse.status)
	) {
		return jsonResponse
	}

	const emailFormResponse = await createEndpoint.postForm<AuthResponse>(
		'/api/v1/auth/login',
		toEmailForm(payload)
	)

	if (
		emailFormResponse.ok ||
		!createEndpoint.isRetryableContentStatus(emailFormResponse.status)
	) {
		return emailFormResponse
	}

	return createEndpoint.postForm<AuthResponse>(
		'/api/v1/auth/login',
		toUsernameForm(payload)
	)
}

export const registerRequest = (payload: RegisterPayload) =>
	createEndpoint.postJson<AuthResponse>('/api/v1/auth/register', payload)
