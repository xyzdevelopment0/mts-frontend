import { getBillingUsageQuery } from '@repo/api-client/queries/billing'
import { Headline } from '@repo/ui/headline'
import { cn } from '@repo/utils/cn'
import { type BillingUsageItem } from '@repo/types/billing/usage'
import { formatCost, formatInteger, formatPercent, formatTime } from './utils'
import { RamWhatIf } from './components/ram-what-if'

type ChargeKind = 'base' | 'cpu' | 'ram'

type TimelineBucket = {
	key: string
	startedAt: number
	base: number
	cpu: number
	ram: number
	total: number
}

type InstanceSummary = {
	instanceId: number
	base: number
	cpu: number
	ram: number
	total: number
	samples: number
}

const CHARGE_LABELS: Record<ChargeKind, string> = {
	base: 'Базовая ставка',
	cpu: 'CPU',
	ram: 'RAM',
}

const USAGE_WINDOW_MINUTES = 30

const getUsageBarTone = (
	index: number,
	total: number,
	max: number,
	size: number
) => {
	const recency = size > 0 ? (index + 1) / size : 0
	const intensity = max > 0 ? total / max : 0

	if (recency >= 0.97 || intensity >= 0.94) {
		return 'bg-purple-4'
	}
	if (recency >= 0.86 || intensity >= 0.78) {
		return 'bg-purple-4/80'
	}
	if (recency >= 0.72 || intensity >= 0.62) {
		return 'bg-purple-3/80'
	}
	if (recency >= 0.52 || intensity >= 0.44) {
		return 'bg-purple-3/65'
	}
	return 'bg-purple-2/70'
}

const chargeEntries = (
	base: number,
	cpu: number,
	ram: number
): Array<{ kind: ChargeKind; value: number }> => [
	{ kind: 'base', value: base },
	{ kind: 'cpu', value: cpu },
	{ kind: 'ram', value: ram },
]

const toMinuteKey = (value: string) => {
	const date = new Date(value)
	if (Number.isNaN(date.getTime())) {
		return null
	}
	date.setSeconds(0, 0)
	return date.toISOString()
}

const aggregateTimeline = (items: BillingUsageItem[]) => {
	const map = new Map<string, TimelineBucket>()

	for (const item of items) {
		const minuteKey = toMinuteKey(item.started_at)
		if (!minuteKey) {
			continue
		}

		const existing =
			map.get(minuteKey) ??
			({
				key: minuteKey,
				startedAt: Date.parse(minuteKey),
				base: 0,
				cpu: 0,
				ram: 0,
				total: 0,
			} satisfies TimelineBucket)

		existing.base += item.base_price_per_min
		existing.cpu += item.cpu_charge
		existing.ram += item.ram_charge
		existing.total += item.total_charge
		map.set(minuteKey, existing)
	}

	return [...map.values()].sort((a, b) => a.startedAt - b.startedAt)
}

const aggregateInstances = (items: BillingUsageItem[]) => {
	const map = new Map<number, InstanceSummary>()

	for (const item of items) {
		const existing =
			map.get(item.instance_id) ??
			({
				instanceId: item.instance_id,
				base: 0,
				cpu: 0,
				ram: 0,
				total: 0,
				samples: 0,
			} satisfies InstanceSummary)

		existing.base += item.base_price_per_min
		existing.cpu += item.cpu_charge
		existing.ram += item.ram_charge
		existing.total += item.total_charge
		existing.samples += 1
		map.set(item.instance_id, existing)
	}

	return [...map.values()].sort((a, b) => b.total - a.total)
}

export const Cost = async () => {
	const response = await getBillingUsageQuery()
	const usage = response.data

	if (!response.ok || !usage) {
		return (
			<main className='col flex-1 gap-4'>
				<h1 className='text-fg-4 text-2xl font-semibold'>Обзор затрат</h1>
				<section className='bg-bg-2 rounded-2xl p-6'>
					<p className='text-fg-3'>
						Не удалось получить данные по затратам. Код ответа:{' '}
						{response.status}.
					</p>
				</section>
			</main>
		)
	}

	const items = usage.items
	const totals = items.reduce(
		(acc, item) => ({
			base: acc.base + item.base_price_per_min,
			cpu: acc.cpu + item.cpu_charge,
			ram: acc.ram + item.ram_charge,
			durationSec: acc.durationSec + item.duration_sec,
		}),
		{ base: 0, cpu: 0, ram: 0, durationSec: 0 }
	)

	const billedTotal = usage.total_charged
	const chargeTotal = totals.base + totals.cpu + totals.ram
	const durationMinutes = totals.durationSec > 0 ? totals.durationSec / 60 : 0
	const avgCostPerMinute =
		durationMinutes > 0 ? billedTotal / durationMinutes : 0
	const projectedDaily = avgCostPerMinute * 60 * 24

	const chargeParts = chargeEntries(totals.base, totals.cpu, totals.ram)
	const topChargePart = chargeParts.reduce((best, item) =>
		item.value > best.value ? item : best
	)
	const topChargeShare = chargeTotal > 0 ? topChargePart.value / chargeTotal : 0

	const timeline = aggregateTimeline(items)
	const visibleTimeline = timeline.slice(-USAGE_WINDOW_MINUTES)
	const maxTimelineTotal = Math.max(
		...visibleTimeline.map(item => item.total),
		0.000001
	)

	const topInstances = aggregateInstances(items).slice(0, 5)
	const topInstance = topInstances[0]

	const ramShare = chargeTotal > 0 ? totals.ram / chargeTotal : 0
	const biggestSpike = visibleTimeline.reduce<{
		growth: number
		from?: TimelineBucket
		to?: TimelineBucket
	}>(
		(best, bucket, index, list) => {
			if (index === 0) {
				return best
			}
			const prev = list[index - 1]
			if (!prev || prev.total <= 0) {
				return best
			}
			const growth = (bucket.total - prev.total) / prev.total
			if (growth > best.growth) {
				return { growth, from: prev, to: bucket }
			}
			return best
		},
		{ growth: 0 }
	)

	const insights = [
		ramShare >= 0.6
			? `RAM доминирует: ${formatPercent(ramShare)} от общей стоимости.`
			: null,
		topInstance
			? `Инстанс #${topInstance.instanceId} самый дорогой: ${formatCost(topInstance.total)}.`
			: null,
		biggestSpike.growth >= 0.25 && biggestSpike.to
			? `Резкий скачок: ${formatPercent(biggestSpike.growth)} в ${formatTime(biggestSpike.to.startedAt)}.`
			: null,
	].filter(Boolean)

	const periodLabel =
		visibleTimeline.length > 0
			? `${formatTime(visibleTimeline[0].startedAt)} - ${formatTime(visibleTimeline[visibleTimeline.length - 1].startedAt)}`
			: 'Нет данных'

	return (
		<main className='col flex-1 gap-6'>
			<div className='col gap-1'>
				<h1 className='text-fg-4 text-2xl font-semibold'>Обзор затрат</h1>
				<p className='text-fg-2'>
					Затраты по инстансам с разложением на базовую ставку, CPU и RAM.
				</p>
			</div>

			<section className='grid grid-cols-1 gap-4 md:grid-cols-3'>
				<article className='col bg-bg-2 rounded-2xl p-5'>
					<span className='text-fg-2 text-sm'>Всего начислено</span>
					<span className='text-fg-4 mt-1 text-2xl font-medium'>
						{formatCost(billedTotal)}
					</span>
					<span className='text-fg-1 mt-2 text-xs'>
						{formatInteger(items.length)} записей
					</span>
				</article>
				<article className='col bg-bg-2 rounded-2xl p-5'>
					<span className='text-fg-2 text-sm'>Средняя стоимость/мин</span>
					<span className='text-fg-4 mt-1 text-2xl font-medium'>
						{formatCost(avgCostPerMinute)}
					</span>
					<span className='text-fg-1 mt-2 text-xs'>
						Прогноз на 24ч: {formatCost(projectedDaily)}
					</span>
				</article>
				<article className='col bg-bg-2 rounded-2xl p-5'>
					<span className='text-fg-2 text-sm'>Основной источник затрат</span>
					<span className='text-fg-4 mt-1 text-2xl font-medium'>
						{CHARGE_LABELS[topChargePart.kind]}
					</span>
					<span className='text-fg-1 mt-2 text-xs'>
						{formatPercent(topChargeShare)} от всех расходов
					</span>
				</article>
			</section>

			<section className='grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_320px]'>
				<article className='col bg-bg-2 gap-4 rounded-2xl p-5'>
					<Headline
						title='Использование за последние 30 минут'
						description={periodLabel}
					/>
					<div
						className={cn(
							'overflow-x-auto rounded-[1.75rem] px-2 py-3 sm:px-3 sm:py-4',
							'bg-[linear-gradient(180deg,var(--color-bg-3),var(--color-bg-2))]'
						)}
					>
						<div className='row-end h-56 min-w-max gap-2'>
							{visibleTimeline.length > 0 ? (
								visibleTimeline.map((item, index) => {
									const total = item.total
									const height = Math.max((total / maxTimelineTotal) * 100, 8)
									const label = formatTime(item.startedAt)

									return (
										<div
											key={item.key}
											className='col-center h-full justify-end'
										>
											<div
												className={cn(
													'w-4 rounded-full sm:w-5',
													getUsageBarTone(
														index,
														total,
														maxTimelineTotal,
														visibleTimeline.length
													)
												)}
												title={`${label} • ${formatCost(total)}`}
												style={{ height: `${height}%` }}
											/>
										</div>
									)
								})
							) : (
								<div className='text-fg-2 py-10 text-sm'>
									Нет данных для графика.
								</div>
							)}
						</div>
					</div>
				</article>

				<RamWhatIf totalCharged={billedTotal} ramCharged={totals.ram} />
			</section>

			<section className='grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_280px]'>
				<article className='col bg-bg-2 gap-3 rounded-2xl p-5'>
					<h2 className='text-fg-4 text-sm font-medium'>
						Самые затратные инстансы
					</h2>
					<div className='overflow-x-auto'>
						<table className='min-w-full text-sm'>
							<thead>
								<tr className='text-fg-1 border-bg-3 border-b text-left'>
									<th className='py-2 pr-4 font-medium'>Инстанс</th>
									<th className='py-2 pr-4 font-medium'>Итого</th>
									<th className='py-2 pr-4 font-medium'>RAM</th>
									<th className='py-2 font-medium'>Записи</th>
								</tr>
							</thead>
							<tbody>
								{topInstances.length > 0 ? (
									topInstances.map(item => {
										const itemRamShare =
											item.total > 0 ? item.ram / item.total : 0
										return (
											<tr
												key={item.instanceId}
												className='border-bg-3 border-b last:border-b-0'
											>
												<td className='text-fg-4 py-3 pr-4 font-medium'>
													#{item.instanceId}
												</td>
												<td className='text-fg-3 py-3 pr-4'>
													{formatCost(item.total)}
												</td>
												<td className='text-fg-3 py-3 pr-4'>
													{formatPercent(itemRamShare)}
												</td>
												<td className='text-fg-3 py-3'>
													{formatInteger(item.samples)}
												</td>
											</tr>
										)
									})
								) : (
									<tr>
										<td colSpan={4} className='text-fg-2 py-6 text-center'>
											Нет данных по инстансам
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</article>

				<article className='col bg-bg-2 gap-3 rounded-2xl p-5'>
					<h2 className='text-fg-4 text-sm font-medium'>Выводы</h2>
					<div className='col gap-2'>
						{insights.length > 0 ? (
							insights.map(item => (
								<p
									key={item}
									className={cn(
										'rounded-xl px-3 py-2 text-sm',
										'bg-bg-1 text-fg-3'
									)}
								>
									{item}
								</p>
							))
						) : (
							<p className='bg-bg-1 text-fg-3 rounded-xl px-3 py-2 text-sm'>
								Текущие расходы стабильны, критичных аномалий не найдено.
							</p>
						)}
					</div>
				</article>
			</section>
		</main>
	)
}
