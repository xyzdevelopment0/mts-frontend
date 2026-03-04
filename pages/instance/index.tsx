import { CpuLiveChart } from './components/cpu-live-chart'
import { RamLiveChart } from './components/ram-live-chart'

type InstanceDetailsProps = {
	id: string
}

export const InstanceDetails = ({ id }: InstanceDetailsProps) => (
	<main className='col flex-1'>
		<section key={id} className='col lg:row flex-1 gap-4'>
			<CpuLiveChart />
			<RamLiveChart />
		</section>
	</main>
)
