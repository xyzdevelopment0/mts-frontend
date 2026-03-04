import { Button } from '@/components/button'
import { Input } from '@/components/input'

const HomePage = () => (
	<main className='grid min-h-dvh place-items-center p-6'>
		<div className='w-full max-w-md'>
			<form className='col gap-4'>
				<Input id='name' placeholder='Project name' defaultValue='Acme' />
				<Button type='submit'>Create project</Button>
			</form>
		</div>
	</main>
)

export default HomePage
