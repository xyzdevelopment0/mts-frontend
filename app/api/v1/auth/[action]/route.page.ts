const apiBaseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL ?? '').replace(
	/\/$/,
	''
)
const actions = new Set(['login', 'register'])

interface Context {
	params: Promise<{ action: string }>
}

const normalizeSetCookie = (setCookie: string, host: string) => {
	const hostname = host.split(':')[0]
	if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
		return setCookie
	}

	return setCookie
		.replace(/;\s*Secure/gi, '')
		.replace(/;\s*SameSite=None/gi, '; SameSite=Lax')
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
	const setCookie = response.headers.get('set-cookie')
	if (setCookie) {
		const host = request.headers.get('host') ?? ''
		headers.set('set-cookie', normalizeSetCookie(setCookie, host))
	}

	return new Response(response.body, {
		status: response.status,
		headers,
	})
}
