import { cookies } from 'next/headers'
import { ACCESS_TOKEN_COOKIE_NAME } from '@/api/constants/cookie-names'
import { listInstancesQuery } from '@/api/queries/instances'

const HomePage = async () => {
	const response = await listInstancesQuery()
	const accessToken =
		(await cookies()).get(ACCESS_TOKEN_COOKIE_NAME)?.value ?? ''
	const accessTokenDebug = accessToken.slice(0, 50)
	const debugText = JSON.stringify(response.data, null, 2)

	return (
		<main className='col-center flex-1 justify-center gap-2'>
			<h1 className='text-fg-4 text-2xl font-semibold'>Главная</h1>
			<p className='text-fg-2 text-sm'>
				Добро пожаловать в облачную панель управления.
			</p>
			<p className='text-fg-2 w-full text-xs break-all'>
				access_token(0,50): {accessTokenDebug || 'empty'}
			</p>
			<pre className='text-fg-2 w-full overflow-auto text-xs'>{debugText}</pre>
		</main>
	)
}

export default HomePage
