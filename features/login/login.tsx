import { LoginProvider } from './store'
import { LoginStep1 } from './steps/1'

const LoginContent = () => (
	<main className='bg-bg-1 min-h-dvh md:grid md:grid-cols-2'>
		<section className='col-center min-h-dvh justify-center px-6 py-10'>
			<LoginStep1 />
		</section>
		<section className='bg-bg-2 hidden md:block' />
	</main>
)

export const Login = () => (
	<LoginProvider>
		<LoginContent />
	</LoginProvider>
)
