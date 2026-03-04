import { cn } from '@/utils/cn'

type AvatarProps = {
	letter: string
	className?: string
}

export const Avatar = ({ letter, className }: AvatarProps) => (
	<span
		data-slot='avatar'
		className={cn(
			'center bg-bg-4 text-fg-2 size-6 shrink-0 overflow-hidden rounded-full text-sm font-medium uppercase select-none',
			className
		)}
	>
		{letter.slice(0, 1)}
	</span>
)
