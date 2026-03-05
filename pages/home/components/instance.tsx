import Link from 'next/link'
import { ImageCodeIcon } from '@/components/image-code-icon'
import { type Instance } from '@/types/instance'
import { cn } from '@/utils/cn'
import {
	INSTANCE_STATUS_DOT_COLORS,
	INSTANCE_STATUS_LABELS,
} from '@/utils/instance-status'

type InstanceProps = {
	item: Instance
	imageCode?: string
}

export const HomeInstance = ({ item, imageCode }: InstanceProps) => (
	<Link
		href={`/instance/${item.id}`}
		className={cn(
			'rounded-2xl p-6 transition-colors',
			'bg-bg-2 hover:bg-bg-3 aspect-[2/1]',
			'focus-visible:ring-purple-2 focus-visible:ring-2 focus-visible:outline-none'
		)}
	>
		<div className='col h-full justify-between gap-3'>
			<div className='row-center justify-between gap-2'>
				<div className='row-center min-w-0 gap-1.5'>
					<ImageCodeIcon code={imageCode} className='size-5' />
					<p className='text-fg-4 truncate font-medium'>{item.name}</p>
				</div>
				<span
					className={cn(
						'size-2.5 shrink-0 rounded-full',
						INSTANCE_STATUS_DOT_COLORS[item.status]
					)}
					aria-label={INSTANCE_STATUS_LABELS[item.status]}
					title={INSTANCE_STATUS_LABELS[item.status]}
				/>
			</div>
			<p className='text-fg-2 truncate'>{item.ip_address}</p>
		</div>
	</Link>
)
