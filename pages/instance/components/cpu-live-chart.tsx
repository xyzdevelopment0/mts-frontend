import { LiveMetricChart } from './live-metric-chart'

export const CpuLiveChart = () => (
	<LiveMetricChart
		label='Процессор'
		color='#2c78fc'
		min={5}
		max={100}
		initialValue={42}
		maxStep={12}
	/>
)
