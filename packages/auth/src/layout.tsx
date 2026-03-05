type AuthLayoutProps = Readonly<{
	children: React.ReactNode
}>

const AUTH_ASIDE_IMAGE_URL = 'https://i.ibb.co/W4fH9jyQ/image.png'
const AUTH_ASIDE_BACKGROUND_URL = 'https://i.ibb.co/B2C4JM1n/image.png'

export const AuthLayout = ({ children }: AuthLayoutProps) => (
	<main className='bg-bg-1 min-h-dvh md:grid md:grid-cols-2'>
		<section className='col-center min-h-dvh justify-center px-6 py-10'>
			{children}
		</section>
		<section
			className='relative hidden overflow-hidden bg-cover bg-center bg-no-repeat md:block'
			style={{ backgroundImage: `url('${AUTH_ASIDE_BACKGROUND_URL}')` }}
		>
			<div
				className='absolute top-1/2 left-20 h-[60%] w-full -translate-y-1/2 overflow-hidden rounded-2xl bg-cover bg-left bg-no-repeat'
				style={{ backgroundImage: `url('${AUTH_ASIDE_IMAGE_URL}')` }}
			/>
		</section>
	</main>
)
