import { cn } from '@/utils/cn'

type StepperItem = {
	id: string | number
}

type StepperProps<T extends StepperItem> = {
	items: readonly T[]
	activeId: T['id']
	className?: string
}

export const Stepper = <T extends StepperItem>({
	items,
	activeId,
	className,
}: StepperProps<T>) => (
	<div className={cn('flex items-center gap-1.5', className)}>
		{items.map(item => (
			<div
				key={item.id}
				className={cn(
					'rounded-full transition-all',
					item.id === activeId ? 'bg-purple-4 h-2 w-6' : 'bg-gray-2 h-2 w-2'
				)}
			/>
		))}
	</div>
)
