import { ArchiveArrowUpIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { type DeploymentDashRead } from '@repo/types/deployment'
import { Label } from '@/pages/instance/components/label'
import { HomeDeployment } from './deployment'

type DeploymentsGroupProps = {
	items: DeploymentDashRead[]
}

export const DeploymentsGroup = ({ items }: DeploymentsGroupProps) => (
	<section className='col gap-2'>
		<Label
			icon={
				<HugeiconsIcon icon={ArchiveArrowUpIcon} size={16} strokeWidth={2} />
			}
		>
			Деплои
		</Label>
		<div className='bg-bg-2 rounded-2xl p-2'>
			<div className='col gap-2'>
				{items.map(item => (
					<HomeDeployment key={item.deployment_id} item={item} />
				))}
			</div>
		</div>
	</section>
)
