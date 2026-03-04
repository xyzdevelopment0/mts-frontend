import { redirect } from 'next/navigation'
import { getInstanceQuery } from '@/api/queries/instance'
import { Headline } from '@/components/headline'
import { CpuLiveChart } from './components/cpu-live-chart'
import { RamLiveChart } from './components/ram-live-chart'
import { InstanceTitle } from './components/title'

type InstanceDetailsProps = {
	id: string
}

export const InstanceDetails = async ({ id }: InstanceDetailsProps) => {
	const instanceId = Number(id)
	if (!Number.isInteger(instanceId) || String(instanceId) !== id) {
		redirect('/home')
	}

	const response = await getInstanceQuery(instanceId)
	if (!response.ok || !response.data) {
		redirect('/home')
	}

	return (
		<main className='col flex-1 gap-8'>
			<Headline
				title={
					<InstanceTitle
						name={response.data.name}
						imageId={response.data.image_id}
					/>
				}
				description={response.data.ip_address}
			/>
			<section key={id} className='col lg:row flex-1 gap-4'>
				<CpuLiveChart />
				<RamLiveChart />
			</section>
		</main>
	)
}
