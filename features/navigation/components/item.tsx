'use client'

import { HugeiconsIcon } from '@hugeicons/react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { cn } from '@/utils/cn'
import type { NavigationItem } from '../constants/items'
import { useItemActive } from '../hooks/item-active'

type NavigationItemProps = NavigationItem

export const NavigationItemView = ({
	href,
	icon,
	label,
}: NavigationItemProps) => {
	const active = useItemActive(href)

	return (
		<Link
			href={href}
			className={cn(
				'relative flex min-h-9 min-w-9 items-center justify-center px-2 text-sm font-medium transition-colors duration-150 ease-out',
				active ? 'text-purple-4' : 'text-fg-2 hover:text-fg-3'
			)}
			data-status={active ? 'active' : 'inactive'}
			aria-current={active ? 'page' : undefined}
		>
			{active ? (
				<motion.span
					layoutId='sidebar-indicator'
					transition={{
						type: 'spring',
						stiffness: 520,
						damping: 38,
						mass: 0.45,
					}}
					className='corner-superellipse/1.25 bg-purple-4/15 absolute inset-0 z-0 rounded-full'
				/>
			) : null}
			<span className='row-center relative z-10 gap-1'>
				<HugeiconsIcon icon={icon} size={20} strokeWidth={1.5} />
				{label ? (
					<span className='inline-flex items-center'>
						<span>{label}</span>
					</span>
				) : null}
			</span>
		</Link>
	)
}
