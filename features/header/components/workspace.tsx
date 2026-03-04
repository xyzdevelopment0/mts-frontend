import { Avatar } from '@/components/avatar'
import { cn } from '@/utils/cn'
import { ArrowDown01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

export const HeaderWorkspace = () => (
	<div className='row-center gap-2.5 select-none'>
		<div
			className={cn(
				'center h-6 w-6 rounded-full',
				'bg-bg-2 shadow-[0_0_0_1px_rgba(0,0,0,0.1)]'
			)}
		>
			<Avatar letter='W' />
		</div>
		<span className='text-fg-4 text-sm font-medium'>Workspace</span>
		<HugeiconsIcon
			icon={ArrowDown01Icon}
			size={16}
			strokeWidth={2.5}
			className='text-fg-2'
		/>
	</div>
)
