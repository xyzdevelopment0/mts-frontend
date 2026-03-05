'use client'

import { Avatar } from '@repo/ui/avatar'
import { useDashboard } from '@/features/dashboard'
import { cn } from '@repo/utils/cn'
import { ArrowDown01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

const getFirstLetter = (value: string) => value.trim().charAt(0).toUpperCase()

export const HeaderWorkspace = () => {
	const { data } = useDashboard()
	const workspaceName = data.tenant.name.trim() || 'Workspace'
	const letter = getFirstLetter(workspaceName) || 'W'

	return (
		<div className='row-center gap-2.5 select-none'>
			<div
				className={cn(
					'center h-6 w-6 rounded-full',
					'bg-bg-2 shadow-[0_0_0_1px_rgba(0,0,0,0.1)]'
				)}
			>
				<Avatar letter={letter} />
			</div>
			<span className='text-fg-4 text-sm font-medium'>{workspaceName}</span>
			<HugeiconsIcon
				icon={ArrowDown01Icon}
				size={16}
				strokeWidth={2.5}
				className='text-fg-2'
			/>
		</div>
	)
}
