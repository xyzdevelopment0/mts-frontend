import { type Deployment } from '@repo/types/deployment'
import { formatDateTime } from '@/features/deployments'

type DeploymentMetaProps = {
	deployment: Deployment
}

export const DeploymentMeta = ({ deployment }: DeploymentMetaProps) => {
	const parts = [
		`Статус: ${deployment.status}`,
		`Обновлен: ${formatDateTime(deployment.updated_at)}`,
	].filter(Boolean)

	return <span>{parts.join(' • ')}</span>
}
