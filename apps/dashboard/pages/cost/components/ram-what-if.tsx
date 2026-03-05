'use client'

import { useMemo, useState } from 'react'
import { cn } from '@repo/utils/cn'
import { formatCost, formatPercent } from '../utils'

type RamWhatIfProps = {
	totalCharged: number
	ramCharged: number
	className?: string
}

const RAM_REDUCTION_MIN = 0
const RAM_REDUCTION_MAX = 80

export const RamWhatIf = ({
	totalCharged,
	ramCharged,
	className,
}: RamWhatIfProps) => {
	const [ramReduction, setRamReduction] = useState(20)
	const ramReductionProgress =
		((ramReduction - RAM_REDUCTION_MIN) /
			(RAM_REDUCTION_MAX - RAM_REDUCTION_MIN)) *
		100

	const { projectedTotal, saving, ramShare } = useMemo(() => {
		const ratio = ramReduction / 100
		const nextSaving = ramCharged * ratio

		return {
			projectedTotal: Math.max(totalCharged - nextSaving, 0),
			saving: nextSaving,
			ramShare: totalCharged > 0 ? ramCharged / totalCharged : 0,
		}
	}, [ramCharged, ramReduction, totalCharged])

	return (
		<section
			className={cn(
				'col h-full justify-between gap-4 rounded-2xl p-5',
				'bg-bg-2 border border-transparent',
				className
			)}
		>
			<div className='col gap-4'>
				<div className='col gap-1'>
					<h3 className='text-fg-4 text-sm font-medium'>Сценарий по RAM</h3>
					<p className='text-fg-2 text-sm'>
						Сценарий: уменьшаем потребление RAM и смотрим потенциальную
						экономию.
					</p>
				</div>
				<div className='col'>
					<div className='relative'>
						<input
							type='range'
							min={RAM_REDUCTION_MIN}
							max={RAM_REDUCTION_MAX}
							step={1}
							value={ramReduction}
							onChange={event => setRamReduction(Number(event.target.value))}
							className={cn(
								'absolute inset-0 z-20 w-full cursor-pointer opacity-0',
								'h-full'
							)}
						/>
						<div
							className={cn(
								'row-center rounded-full border p-1.5',
								'border-bg-3 bg-bg-1'
							)}
						>
							<div className='relative mx-2 h-10 min-w-[4.5rem] flex-1'>
								<div className='bg-bg-3 absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full' />
								<div
									className='bg-fg-4 absolute top-1/2 h-6 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full'
									style={{ left: `${ramReductionProgress}%` }}
								/>
							</div>
							<div className='text-fg-4 w-12 pr-2 text-right text-xl font-medium tabular-nums'>
								{ramReduction}%
							</div>
						</div>
					</div>
				</div>
				<div className='grid grid-cols-2 gap-3 text-sm'>
					<div className='col bg-bg-1 rounded-xl p-3'>
						<span className='text-fg-2'>Экономия</span>
						<span className='text-fg-4 text-base font-medium'>
							{formatCost(saving)}
						</span>
					</div>
					<div className='col bg-bg-1 rounded-xl p-3'>
						<span className='text-fg-2'>Новый итог</span>
						<span className='text-fg-4 text-base font-medium'>
							{formatCost(projectedTotal)}
						</span>
					</div>
				</div>
			</div>
			<p className='text-fg-1 text-xs'>
				Текущая доля RAM в расходах: {formatPercent(ramShare)}
			</p>
		</section>
	)
}
