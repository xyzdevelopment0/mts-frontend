import { cn } from '@/utils/cn'

type EmptyStateProps = {
	illustration: React.ReactNode
	title: React.ReactNode
	description: React.ReactNode
	action: React.ReactNode
}

export const EmptyState = ({
	illustration,
	title,
	description,
	action,
}: EmptyStateProps) => (
	<div
		className={cn(
			'col-center mx-auto flex-1 justify-start gap-7 text-center',
			'w-full max-w-[23rem]'
		)}
	>
		<div className='w-full max-w-[21.5rem]'>{illustration}</div>
		<div className='col-center gap-2'>
			{title}
			{description}
		</div>
		{action}
	</div>
)
