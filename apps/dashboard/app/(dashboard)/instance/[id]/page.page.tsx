import { InstanceDetails } from '@/pages/instance'

type InstancePageProps = Readonly<{
	params: Promise<{
		id: string
	}>
}>

const InstancePage = async ({ params }: InstancePageProps) => {
	const { id } = await params
	return <InstanceDetails id={id} />
}

export default InstancePage
