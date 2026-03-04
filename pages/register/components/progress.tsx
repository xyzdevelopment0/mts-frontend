import { cn } from '@/utils/cn'

type ProgressProps = {
	step: number
	total?: number
	className?: string
}

export const Progress = ({ step, total = 3, className }: ProgressProps) => (
	<div className={cn('flex items-center gap-1.5', className)}>
		{Array.from({ length: total }, (_, index) => {
			const active = index + 1 === step

			return (
				<div
					key={index}
					className={cn(
						'rounded-full transition-all',
						active ? 'bg-purple-4 h-2 w-6' : 'bg-gray-2 h-2 w-2'
					)}
				/>
			)
		})}
	</div>
)
