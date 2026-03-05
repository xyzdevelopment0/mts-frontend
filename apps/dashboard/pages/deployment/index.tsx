import { redirect } from 'next/navigation'
import { getDeploymentQuery } from '@repo/api-client/queries/deployment'
import { DeploymentDetailsContent } from './components/details'

type DeploymentDetailsProps = {
	id: string
}

export const DeploymentDetails = async ({ id }: DeploymentDetailsProps) => {
	if (!id.trim()) {
		redirect('/home')
	}

	const response = await getDeploymentQuery(id)

	if (!response.ok || !response.data) {
		redirect('/home')
	}

	return <DeploymentDetailsContent initialDeployment={response.data} />
}
