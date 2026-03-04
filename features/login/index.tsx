'use client'

import { LoginProvider } from './store'
import { LoginStep1 } from './steps/1'

const LoginContent = () => (
	<main className='bg-bg-1 min-h-dvh md:grid md:grid-cols-2'>
		<section className='col-center min-h-dvh justify-center px-6 py-10'>
			<LoginStep1 />
		</section>
		<section
			className='hidden bg-cover bg-center bg-no-repeat lg:block'
			style={{ backgroundImage: "url('https://i.ibb.co/B2C4JM1n/image.png')" }}
		/>
	</main>
)

export const Login = () => (
	<LoginProvider>
		<LoginContent />
	</LoginProvider>
)
