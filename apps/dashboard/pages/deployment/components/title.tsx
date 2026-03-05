import { type Deployment } from '@repo/types/deployment'
import { cn } from '@repo/utils/cn'
import {
	getDeploymentRepositoryLabel,
	getDeploymentStatusDotColor,
	getDeploymentStatusLabel,
} from '@/features/deployments'

type DeploymentTitleProps = {
	deployment: Deployment
}

export const DeploymentTitle = ({ deployment }: DeploymentTitleProps) => (
	<div className='row-center justify-center gap-3'>
		<div className='row-center min-w-0 gap-1.5'>
			<span className='truncate'>
				{getDeploymentRepositoryLabel(deployment.github_url)}
			</span>
		</div>
		<span
			className={cn(
				'size-2.5 shrink-0 rounded-full',
				getDeploymentStatusDotColor(deployment.status)
			)}
			aria-label={getDeploymentStatusLabel(deployment.status)}
			title={getDeploymentStatusLabel(deployment.status)}
		/>
	</div>
)
