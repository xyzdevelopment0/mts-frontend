const apiBaseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL ?? '').replace(
	/\/$/,
	''
)
const actions = new Set(['login', 'register'])

interface Context {
	params: Promise<{ action: string }>
}

const isLocalHost = (host: string) => {
	const hostname = host.split(':')[0]
	return hostname === 'localhost' || hostname === '127.0.0.1'
}

const normalizeSetCookie = (
	setCookie: string,
	options: { localHost: boolean; https: boolean }
) => {
	let normalized = setCookie
		.replace(/;\s*Domain=[^;]*/gi, '')
		.replace(/;\s*SameSite=None/gi, '; SameSite=Lax')

	if (options.localHost || !options.https) {
		return normalized.replace(/;\s*Secure/gi, '')
	}

	if (!/;\s*Secure/i.test(normalized)) {
		normalized = `${normalized}; Secure`
	}

	return normalized
}

export const POST = async (request: Request, context: Context) => {
	if (!apiBaseUrl) {
		return Response.json(
			{ detail: 'NEXT_PUBLIC_API_BASE_URL is not configured' },
			{ status: 500 }
		)
	}

	const { action } = await context.params
	if (!actions.has(action)) {
		return Response.json({ detail: 'Not found' }, { status: 404 })
	}

	const contentType = request.headers.get('content-type')
	const body = await request.text()
	const response = await fetch(`${apiBaseUrl}/api/v1/auth/${action}`, {
		method: 'POST',
		headers: contentType ? { 'content-type': contentType } : undefined,
		body: body || undefined,
		cache: 'no-store',
	})

	const headers = new Headers()
	const responseContentType = response.headers.get('content-type')
	if (responseContentType) {
		headers.set('content-type', responseContentType)
	}

	const host = request.headers.get('host') ?? ''
	const https = (request.headers.get('x-forwarded-proto') ?? 'http') === 'https'
	for (const setCookie of response.headers.getSetCookie()) {
		headers.append(
			'set-cookie',
			normalizeSetCookie(setCookie, {
				localHost: isLocalHost(host),
				https,
			})
		)
	}

	return new Response(response.body, {
		status: response.status,
		headers,
	})
}
