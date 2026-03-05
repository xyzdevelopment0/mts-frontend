import { redirect } from 'next/navigation'
import { getInstanceQuery } from '@repo/api-client/queries/instance'
import { Headline } from '@repo/ui/headline'
import {
	SshHostSnippet,
	SshPortSnippet,
	SshUserSnippet,
} from '@/features/instance-ssh-snippets'
import { ActionButtons } from './components/action-buttons'
import { CpuLiveChart } from './components/cpu-live-chart'
import { DeployEmptyState } from './components/deploy-empty-state'
import { InstanceMeta } from './components/meta'
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
		<main className='col flex-1 gap-12'>
			<DeployEmptyState tenantId={response.data.tenant_id} />
			<div className='col-center gap-6'>
				<Headline
					title={
						<InstanceTitle
							name={response.data.name}
							imageId={response.data.image_id}
							status={response.data.status}
						/>
					}
					description={
						<InstanceMeta
							flavorId={response.data.flavor_id}
							ipAddress={response.data.ip_address}
						/>
					}
				/>
				<div className='col w-full max-w-[22rem] gap-3'>
					<SshUserSnippet value={response.data.ssh_user} />
					<div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
						<SshHostSnippet value={response.data.ssh_host} />
						<SshPortSnippet value={response.data.ssh_port} />
					</div>
				</div>
				<ActionButtons />
			</div>
			<section key={id} className='col lg:row flex-1 gap-4'>
				<CpuLiveChart />
				<RamLiveChart />
			</section>
		</main>
	)
}
