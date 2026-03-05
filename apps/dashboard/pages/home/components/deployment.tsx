import Link from 'next/link'
import { type DeploymentDashRead } from '@repo/types/deployment'
import { cn } from '@repo/utils/cn'
import {
	formatRelativeShortTime,
	getDeploymentRepositoryLabel,
	getDeploymentStatusDotColor,
	getDeploymentStatusLabel,
} from '@/features/deployments'

type DeploymentProps = {
	item: DeploymentDashRead
}

export const HomeDeployment = ({ item }: DeploymentProps) => (
	<Link
		href={`/deployment/${item.deployment_id}`}
		className={cn(
			'row-center justify-between gap-3 rounded-xl px-4 py-3 transition-colors',
			'bg-bg-1 hover:bg-bg-3',
			'focus-visible:ring-purple-2 focus-visible:ring-2 focus-visible:outline-none'
		)}
	>
		<div className='col min-w-0 gap-0.5'>
			<p className='text-fg-4 truncate text-xl font-medium'>
				{getDeploymentRepositoryLabel(item.github_url)}
			</p>
			<p className='text-fg-2 truncate text-sm'>
				{item.error_message?.trim() || getDeploymentStatusLabel(item.status)}
			</p>
		</div>
		<div className='row-center shrink-0 gap-2'>
			<span
				className={cn(
					'size-2.5 rounded-full',
					getDeploymentStatusDotColor(item.status)
				)}
				aria-label={getDeploymentStatusLabel(item.status)}
				title={getDeploymentStatusLabel(item.status)}
			/>
			<span className='text-fg-2 text-sm tabular-nums'>
				{formatRelativeShortTime(item.updated_at)}
			</span>
		</div>
	</Link>
)
