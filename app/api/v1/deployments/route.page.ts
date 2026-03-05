const apiBaseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL ?? '').replace(
	/\/$/,
	''
)

export const POST = async (request: Request) => {
	if (!apiBaseUrl) {
		return Response.json(
			{ detail: 'NEXT_PUBLIC_API_BASE_URL is not configured' },
			{ status: 500 }
		)
	}

	const contentType = request.headers.get('content-type')
	const cookie = request.headers.get('cookie')
	const body = await request.text()
	const response = await fetch(`${apiBaseUrl}/api/v1/deployments`, {
		method: 'POST',
		headers: {
			...(contentType ? { 'content-type': contentType } : {}),
			...(cookie ? { cookie } : {}),
		},
		body: body || undefined,
		cache: 'no-store',
	})

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
