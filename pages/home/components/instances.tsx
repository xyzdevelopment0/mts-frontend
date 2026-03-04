import { ServerStack03Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { type ImageItem } from '@/types/dashboard'
import { type Instance } from '@/types/instance'
import { InstancesGroup } from './instances-group'

type InstancesProps = {
	items: Instance[]
	images: ImageItem[]
}

export const Instances = ({ items, images }: InstancesProps) => (
	<main className='col flex-1 gap-4'>
		<div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
			<InstancesGroup
				label='Выделенные серверы'
				icon={
					<HugeiconsIcon icon={ServerStack03Icon} size={16} strokeWidth={2} />
				}
				items={items}
				images={images}
			/>
		</div>
	</main>
)
