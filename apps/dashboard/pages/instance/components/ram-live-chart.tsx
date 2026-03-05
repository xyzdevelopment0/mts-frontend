import { LiveMetricChart } from './live-metric-chart'

export const RamLiveChart = () => (
	<LiveMetricChart
		label='Оперативная память'
		color='#33c758'
		min={2}
		max={32}
		initialValue={12}
		maxStep={2.4}
	/>
)
