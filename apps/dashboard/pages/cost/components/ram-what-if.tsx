'use client'

import { useMemo, useState } from 'react'
import { cn } from '@repo/utils/cn'
import { formatCost, formatPercent } from '../utils'

type RamWhatIfProps = {
	totalCharged: number
	ramCharged: number
	className?: string
}

export const RamWhatIf = ({
	totalCharged,
	ramCharged,
	className,
}: RamWhatIfProps) => {
	const [ramReduction, setRamReduction] = useState(20)

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
				'col gap-4 rounded-2xl p-5',
				'bg-bg-2 border border-transparent',
				className
			)}
		>
			<div className='col gap-1'>
				<h3 className='text-fg-4 text-sm font-medium'>What-if по RAM</h3>
				<p className='text-fg-2 text-sm'>
					Сценарий: уменьшаем потребление RAM и смотрим потенциальную экономию.
				</p>
			</div>
			<div className='col gap-2'>
				<div className='row-center justify-between gap-3 text-sm'>
					<span className='text-fg-2'>Уменьшение RAM</span>
					<span className='text-fg-4 font-medium'>{ramReduction}%</span>
				</div>
				<input
					type='range'
					min={0}
					max={80}
					step={1}
					value={ramReduction}
					onChange={event => setRamReduction(Number(event.target.value))}
					className={cn(
						'accent-purple-4 h-2 w-full cursor-pointer rounded-full',
						'bg-bg-4'
					)}
				/>
			</div>
			<div className='grid grid-cols-2 gap-3 text-sm'>
				<div className='col bg-bg-1 rounded-xl p-3'>
					<span className='text-fg-2'>Экономия</span>
					<span className='text-fg-4 text-base font-medium'>
						{formatCost(saving)}
					</span>
				</div>
				<div className='col bg-bg-1 rounded-xl p-3'>
					<span className='text-fg-2'>Новый total</span>
					<span className='text-fg-4 text-base font-medium'>
						{formatCost(projectedTotal)}
					</span>
				</div>
			</div>
			<p className='text-fg-1 text-xs'>
				Текущая доля RAM в расходах: {formatPercent(ramShare)}
			</p>
		</section>
	)
}
