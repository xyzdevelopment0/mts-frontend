'use client'

import { ImageCodeIcon } from '@repo/ui/image-code-icon'
import { useDashboard } from '@/features/dashboard'
import { type InstanceStatus } from '@repo/types/instance'
import { cn } from '@repo/utils/cn'
import {
	INSTANCE_STATUS_DOT_COLORS,
	INSTANCE_STATUS_LABELS,
} from '@repo/utils/instance-status'

type InstanceTitleProps = {
	name: string
	imageId: number
	status: InstanceStatus
}

export const InstanceTitle = ({
	name,
	imageId,
	status,
}: InstanceTitleProps) => {
	const { data } = useDashboard()
	const imageCode = data.images.find(item => item.id === imageId)?.code

	return (
		<div className='row-center justify-center gap-3'>
			<div className='row-center min-w-0 gap-1.5'>
				<ImageCodeIcon code={imageCode} className='size-6' />
				<span className='truncate'>{name}</span>
			</div>
			<span
				className={cn(
					'size-2.5 shrink-0 rounded-full',
					INSTANCE_STATUS_DOT_COLORS[status]
				)}
				aria-label={INSTANCE_STATUS_LABELS[status]}
				title={INSTANCE_STATUS_LABELS[status]}
			/>
		</div>
	)
}
