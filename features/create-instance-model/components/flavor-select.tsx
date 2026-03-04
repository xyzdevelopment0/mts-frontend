import { type Flavor } from '@/types/dashboard'
import { cn } from '@/utils/cn'

type FlavorSelectProps = {
	items: Flavor[]
	value: number | null
	onChange: (value: number) => void
}

const formatRam = (ramMb: number) => {
	const value = ramMb / 1024
	return Number.isInteger(value) ? String(value) : value.toFixed(1)
}

export const FlavorSelect = ({ items, value, onChange }: FlavorSelectProps) => (
	<div className='col gap-2'>
		{items.length === 0 ? (
			<p className='text-fg-2 text-sm'>Нет доступных конфигураций.</p>
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
								{item.name}
							</span>
							<span className='text-fg-2 text-xs'>{item.cpu} vCPU</span>
							<span className='text-fg-2 text-xs'>
								{formatRam(item.ram_mb)} GB
							</span>
						</button>
					)
				})}
			</div>
		)}
	</div>
)
