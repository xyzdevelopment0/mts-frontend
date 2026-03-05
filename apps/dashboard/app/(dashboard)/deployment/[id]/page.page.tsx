import { DeploymentDetails } from '@/pages/deployment'

type DeploymentPageProps = Readonly<{
	params: Promise<{
		id: string
	}>
}>

const DeploymentPage = async ({ params }: DeploymentPageProps) => {
	const { id } = await params
	return <DeploymentDetails id={id} />
}

export default DeploymentPage
