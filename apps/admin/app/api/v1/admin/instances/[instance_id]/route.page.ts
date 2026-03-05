import {
	parsePositiveId,
	proxyAdminRequest,
} from '@/app/api/v1/admin/utils/proxy'

interface Context {
	params: Promise<{ instance_id: string }>
}

export const DELETE = async (request: Request, context: Context) => {
	const { instance_id: rawInstanceId } = await context.params
	const instanceId = parsePositiveId(rawInstanceId)
	if (!instanceId) {
		return Response.json({ detail: 'instance_id is invalid' }, { status: 400 })
	}

	return proxyAdminRequest({
		request,
		method: 'DELETE',
		path: `/api/v1/admin/instances/${encodeURIComponent(instanceId)}`,
	})
}
