import { type ImageItem } from '@/types/dashboard'
import { type Instance } from '@/types/instance'
import { Label } from '@/pages/instance/components/label'
import { HomeInstance } from './instance'

type InstancesGroupProps = {
	label: string
	icon: React.ReactNode
	items: Instance[]
	images: ImageItem[]
}

export const InstancesGroup = ({
	label,
	icon,
	items,
	images,
}: InstancesGroupProps) => {
	const imageCodeById = new Map(images.map(image => [image.id, image.code]))

	return (
		<section className='col gap-2 md:col-span-2 lg:col-span-3'>
			<Label icon={icon}>{label}</Label>
			<div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
				{items.map(item => (
					<HomeInstance
						key={item.id}
						item={item}
						imageCode={imageCodeById.get(item.image_id)}
					/>
				))}
			</div>
		</section>
	)
}
