const apiBaseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL ?? '')
	.replace(/\/api\/v1\/?$/, '')
	.replace(/\/$/, '')

interface ProxyRequestOptions {
	request: Request
	method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
	path: string
	includeBody?: boolean
	includeSearch?: boolean
}

const createMissingApiBaseUrlResponse = () =>
	Response.json(
		{ detail: 'NEXT_PUBLIC_API_BASE_URL is not configured' },
		{ status: 500 }
	)

const createProxyResponse = (response: Response) => {
	const headers = new Headers()
	const responseContentType = response.headers.get('content-type')
	if (responseContentType) {
		headers.set('content-type', responseContentType)
	}

	return new Response(response.body, {
		status: response.status,
		headers,
	})
}

export const parsePositiveId = (value: string) =>
	/^[1-9]\d*$/.test(value) ? value : null

export const proxyAdminRequest = async ({
	request,
	method,
	path,
	includeBody = false,
	includeSearch = false,
}: ProxyRequestOptions) => {
	if (!apiBaseUrl) {
		return createMissingApiBaseUrlResponse()
	}

	const cookie = request.headers.get('cookie')
	const contentType = request.headers.get('content-type')
	const body = includeBody ? await request.text() : ''
	const search = includeSearch ? new URL(request.url).search : ''
	const response = await fetch(`${apiBaseUrl}${path}${search}`, {
		method,
		headers: {
			...(cookie ? { cookie } : {}),
			...(includeBody && contentType ? { 'content-type': contentType } : {}),
		},
		body: includeBody && body ? body : undefined,
		cache: 'no-store',
	})

	return createProxyResponse(response)
}
