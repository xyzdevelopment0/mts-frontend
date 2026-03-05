'use client'

import { CheckmarkCircle02Icon, Copy01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { cn } from '@repo/utils/cn'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const ICON_TRANSITION = {
	type: 'spring' as const,
	duration: 0.2,
	bounce: 0,
}

type RootSnippetProps = Omit<React.ComponentProps<'div'>, 'children'> & {
	value: string
}

export const RootSnippet = ({
	value,
	className,
	...props
}: RootSnippetProps) => {
	const [isCopied, setIsCopied] = useState(false)

	useEffect(() => {
		if (!isCopied) {
			return
		}

		const timeout = setTimeout(() => setIsCopied(false), 1200)
		return () => clearTimeout(timeout)
	}, [isCopied])

	const copy = async () => {
		try {
			await navigator.clipboard.writeText(value)
			setIsCopied(true)
		} catch {}
	}

	return (
		<div
			className={cn(
				'h-10 w-full rounded-lg bg-[#f5f5f5] px-4 text-[#181925]',
				'flex items-center gap-2',
				'backdrop-blur-md',
				'font-medium',
				className
			)}
			{...props}
		>
			<span className='min-w-0 flex-1 truncate text-sm'>{value}</span>
			<button
				type='button'
				aria-label={isCopied ? 'Скопировано' : 'Скопировать'}
				className={cn(
					'text-fg-2 flex size-6 shrink-0 items-center justify-center rounded-full',
					'enabled:hover:text-fg-4 transition-colors',
					'focus-visible:outline-none'
				)}
				onClick={() => void copy()}
			>
				<AnimatePresence mode='wait' initial={false}>
					<motion.span
						key={isCopied ? 'check' : 'copy'}
						initial={{ opacity: 0, scale: 0.85 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.85 }}
						transition={ICON_TRANSITION}
					>
						<HugeiconsIcon
							icon={isCopied ? CheckmarkCircle02Icon : Copy01Icon}
							size={16}
							strokeWidth={2}
						/>
					</motion.span>
				</AnimatePresence>
			</button>
		</div>
	)
}
