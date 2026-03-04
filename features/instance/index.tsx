type InstanceDetailsProps = {
	id: string
}

export const InstanceDetails = ({ id }: InstanceDetailsProps) => (
	<main className='col-center min-h-dvh justify-center gap-2 p-6'>
		<h1 className='text-fg-4 text-2xl font-semibold'>Инстанс</h1>
		<p className='text-fg-2 text-sm'>ID: {id}</p>
	</main>
)
