import { cookies } from 'next/headers'
import { ACCESS_TOKEN_COOKIE_NAME } from '../constants/cookie-names'

type QueryValue = string | number | boolean | null | undefined

interface QueryOptions {
	params?: Record<string, QueryValue | QueryValue[]>
}

export interface QueryResponse<T> {
	ok: boolean
	status: number
	data: T | null
}

const baseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL ?? '')
	.replace(/\/api\/v1\/?$/, '')
	.replace(/\/$/, '')

const toSearchParams = (params?: QueryOptions['params']) => {
	if (!params) return ''
	const searchParams = new URLSearchParams()

	for (const [key, value] of Object.entries(params)) {
		if (value === undefined || value === null || value === '') continue
		if (Array.isArray(value)) {
			for (const item of value) {
				if (item === undefined || item === null || item === '') continue
				searchParams.append(key, String(item))
			}
			continue
		}
		searchParams.append(key, String(value))
	}

	const query = searchParams.toString()
	return query ? `?${query}` : ''
}

export const createQuery = async <T>(
	path: string,
	options: QueryOptions = {}
): Promise<QueryResponse<T>> => {
	try {
		const accessToken = (await cookies()).get(ACCESS_TOKEN_COOKIE_NAME)
		const response = await fetch(
			baseUrl + path + toSearchParams(options.params),
			{
				method: 'GET',
				headers: accessToken
					? { Cookie: `${ACCESS_TOKEN_COOKIE_NAME}=${accessToken.value}` }
					: undefined,
				cache: 'no-store',
			}
		)

		let data: T | null = null
		const contentType = response.headers.get('content-type') ?? ''
		if (contentType.includes('application/json')) {
			try {
				data = (await response.json()) as T
			} catch {
				data = null
			}
		}

		return {
			ok: response.ok,
			status: response.status,
			data,
		}
	} catch {
		return {
			ok: false,
			status: 500,
			data: null,
		}
	}
}
