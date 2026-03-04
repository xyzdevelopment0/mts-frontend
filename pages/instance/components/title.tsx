'use client'

import { ImageCodeIcon } from '@/components/image-code-icon'
import { useDashboard } from '@/features/dashboard'

type InstanceTitleProps = {
	name: string
	imageId: number
}

export const InstanceTitle = ({ name, imageId }: InstanceTitleProps) => {
	const { data } = useDashboard()
	const imageCode = data.images.find(item => item.id === imageId)?.code

	return (
		<span className='row-center justify-center gap-1.5'>
			<ImageCodeIcon code={imageCode} className='size-6' />
			<span className='truncate'>{name}</span>
		</span>
	)
}
