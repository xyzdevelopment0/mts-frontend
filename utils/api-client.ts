type RequestBody = unknown | URLSearchParams

interface RequestOptions {
	method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
	path: string
	body?: RequestBody
}

interface ApiResponse<T> {
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
}: RequestOptions): Promise<ApiResponse<T>> => {
	const isForm = body instanceof URLSearchParams
	const response = await fetch(baseUrl + path, {
		method,
		credentials: 'include',
		headers: isForm
			? { 'Content-Type': 'application/x-www-form-urlencoded' }
			: { 'Content-Type': 'application/json' },
		body: body ? (isForm ? body.toString() : JSON.stringify(body)) : undefined,
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

export const apiClient = {
	postJson: <T>(path: string, body: unknown) =>
		request<T>({ method: 'POST', path, body }),
	postForm: <T>(path: string, body: URLSearchParams) =>
		request<T>({ method: 'POST', path, body }),
	isRetryableContentStatus: (status: number) =>
		RETRYABLE_CONTENT_STATUSES.has(status),
}
