import { apiClient } from '@/utils/api-client'

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
	const jsonResponse = await apiClient.postJson<AuthResponse>(
		'/api/v1/auth/login',
		payload
	)

	if (
		jsonResponse.ok ||
		!apiClient.isRetryableContentStatus(jsonResponse.status)
	) {
		return jsonResponse
	}

	const emailFormResponse = await apiClient.postForm<AuthResponse>(
		'/api/v1/auth/login',
		toEmailForm(payload)
	)

	if (
		emailFormResponse.ok ||
		!apiClient.isRetryableContentStatus(emailFormResponse.status)
	) {
		return emailFormResponse
	}

	return apiClient.postForm<AuthResponse>(
		'/api/v1/auth/login',
		toUsernameForm(payload)
	)
}

export const registerRequest = (payload: RegisterPayload) =>
	apiClient.postJson<AuthResponse>('/api/v1/auth/register', payload)
