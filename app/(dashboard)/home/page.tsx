import { listInstancesQuery } from '@/api/queries/instances'

const HomePage = async () => {
	const response = await listInstancesQuery()
	const debugText = JSON.stringify(response.data, null, 2)

	return (
		<main className='col-center min-h-dvh justify-center gap-2 p-6'>
			<h1 className='text-fg-4 text-2xl font-semibold'>Главная</h1>
			<p className='text-fg-2 text-sm'>
				Добро пожаловать в облачную панель управления.
			</p>
			<pre className='text-fg-2 w-full overflow-auto text-xs'>{debugText}</pre>
		</main>
	)
}

export default HomePage
