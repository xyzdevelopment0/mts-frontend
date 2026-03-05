import {
	parsePositiveId,
	proxyAdminRequest,
} from '@/app/api/v1/admin/utils/proxy'

interface Context {
	params: Promise<{ user_id: string }>
}

export const POST = async (request: Request, context: Context) => {
	const { user_id: rawUserId } = await context.params
	const userId = parsePositiveId(rawUserId)
	if (!userId) {
		return Response.json({ detail: 'user_id is invalid' }, { status: 400 })
	}

	return proxyAdminRequest({
		request,
		method: 'POST',
		path: `/api/v1/admin/users/${encodeURIComponent(userId)}/demote`,
	})
}
