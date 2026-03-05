const apiBaseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL ?? '').replace(
	/\/$/,
	''
)

interface Context {
	params: Promise<{ deployment_id: string }>
}

export const GET = async (request: Request, context: Context) => {
	if (!apiBaseUrl) {
		return Response.json(
			{ detail: 'NEXT_PUBLIC_API_BASE_URL is not configured' },
			{ status: 500 }
		)
	}

	const { deployment_id: deploymentId } = await context.params
	if (!deploymentId) {
		return Response.json(
			{ detail: 'deployment_id is required' },
			{ status: 400 }
		)
	}

	const cookie = request.headers.get('cookie')
	const search = new URL(request.url).search
	const response = await fetch(
		`${apiBaseUrl}/api/v1/deployments/${encodeURIComponent(deploymentId)}${search}`,
		{
			method: 'GET',
			headers: cookie ? { cookie } : undefined,
			cache: 'no-store',
		}
	)

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
