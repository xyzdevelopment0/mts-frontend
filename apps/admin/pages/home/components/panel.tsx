import { cn } from '@repo/utils/cn'

type PanelProps = {
	title: string
	description?: string
	action?: React.ReactNode
	children: React.ReactNode
	className?: string
}

export const Panel = ({
	title,
	description,
	action,
	children,
	className,
}: PanelProps) => (
	<section
		className={cn(
			'col gap-3 rounded-2xl p-5',
			'bg-bg-2 overflow-hidden',
			className
		)}
	>
		<div className='row-center flex-wrap justify-between gap-3'>
			<div className='col gap-0.5'>
				<h2 className='text-fg-4 text-base font-semibold'>{title}</h2>
				{description ? (
					<p className='text-fg-2 text-sm'>{description}</p>
				) : null}
			</div>
			{action}
		</div>
		{children}
	</section>
)
