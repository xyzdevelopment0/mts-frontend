type RequestBody = unknown | URLSearchParams

interface RequestOptions {
	method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
	path: string
	body?: RequestBody
}

export interface EndpointResponse<T> {
	ok: boolean
	status: number
	data: T | null
}

const RETRYABLE_CONTENT_STATUSES = new Set([400, 415, 422])

const baseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL ?? '').replace(/\/$/, '')

const request = async <T>({
	method,
	path,
	body,
}: RequestOptions): Promise<EndpointResponse<T>> => {
	const isForm = body instanceof URLSearchParams
	const headers =
		body === undefined
			? undefined
			: isForm
				? { 'Content-Type': 'application/x-www-form-urlencoded' }
				: { 'Content-Type': 'application/json' }
	const response = await fetch(baseUrl + path, {
		method,
		credentials: 'include',
		headers,
		body:
			body === undefined
				? undefined
				: isForm
					? body.toString()
					: JSON.stringify(body),
	})

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
}

export const createEndpoint = {
	getJson: <T>(path: string) => request<T>({ method: 'GET', path }),
	postJson: <T>(path: string, body: unknown) =>
		request<T>({ method: 'POST', path, body }),
	postForm: <T>(path: string, body: URLSearchParams) =>
		request<T>({ method: 'POST', path, body }),
	isRetryableContentStatus: (status: number) =>
		RETRYABLE_CONTENT_STATUSES.has(status),
}
