import { ServerStack03Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { type ImageItem } from '@repo/types/dashboard'
import { type DeploymentDashRead } from '@repo/types/deployment'
import { type Instance } from '@repo/types/instance'
import { DeploymentsGroup } from './deployments-group'
import { InstancesGroup } from './instances-group'

type InstancesProps = {
	instances: Instance[]
	deployments: DeploymentDashRead[]
	images: ImageItem[]
}

export const Instances = ({
	instances,
	deployments,
	images,
}: InstancesProps) => {
	const imageCodeById = new Map(images.map(image => [image.id, image.code]))
	const postgresItems = instances.filter(item =>
		imageCodeById.get(item.image_id)?.toLowerCase().includes('postgres')
	)
	const serverItems = instances.filter(
		item =>
			!imageCodeById.get(item.image_id)?.toLowerCase().includes('postgres')
	)
	const sortedDeployments = [...deployments].sort(
		(a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at)
	)

	return (
		<main className='col flex-1 gap-6'>
			{sortedDeployments.length > 0 ? (
				<DeploymentsGroup items={sortedDeployments} />
			) : null}
			<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
				{serverItems.length > 0 ? (
					<InstancesGroup
						label='Выделенные серверы'
						icon={
							<HugeiconsIcon
								icon={ServerStack03Icon}
								size={16}
								strokeWidth={2}
							/>
						}
						items={serverItems}
						images={images}
					/>
				) : null}
				{postgresItems.length > 0 ? (
					<InstancesGroup
						label='Базы данных'
						icon={
							<HugeiconsIcon
								icon={ServerStack03Icon}
								size={16}
								strokeWidth={2}
							/>
						}
						items={postgresItems}
						images={images}
					/>
				) : null}
			</div>
		</main>
	)
}
