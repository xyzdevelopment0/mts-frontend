import { type ImageItem } from '@/types/dashboard'
import { cn } from '@/utils/cn'

type ImageSelectProps = {
	items: ImageItem[]
	value: number | null
	onChange: (value: number) => void
}

export const ImageSelect = ({ items, value, onChange }: ImageSelectProps) => (
	<div className='col gap-2'>
		{items.length === 0 ? (
			<p className='text-fg-2 text-sm'>Нет доступных образов.</p>
		) : (
			<div className='grid grid-cols-3 gap-2'>
				{items.map(item => {
					const active = value === item.id

					return (
						<button
							key={item.id}
							type='button'
							className={cn(
								'col bg-bg-1 items-start gap-1 rounded-xl border p-2 text-left transition-all',
								'focus-visible:ring-purple-2 focus-visible:ring-2 focus-visible:outline-none',
								active
									? 'outline-purple-4 border-transparent outline-2'
									: 'border-bg-4 enabled:hover:border-bg-a4'
							)}
							onClick={() => onChange(item.id)}
						>
							<span className='text-fg-4 text-xs leading-tight font-medium'>
								{item.display_name}
							</span>
							<span className='text-fg-2 text-xs'>{item.code}</span>
						</button>
					)
				})}
			</div>
		)}
	</div>
)
