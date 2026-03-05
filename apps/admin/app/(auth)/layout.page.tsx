type LayoutProps = Readonly<{
	children: React.ReactNode
}>

const AuthLayout = ({ children }: LayoutProps) => (
	<main className='bg-bg-1 min-h-dvh md:grid md:grid-cols-2'>
		<section className='col-center min-h-dvh justify-center px-6 py-10'>
			{children}
		</section>
		<section
			className='hidden bg-cover bg-center bg-no-repeat md:block'
			style={{ backgroundImage: "url('https://i.ibb.co/B2C4JM1n/image.png')" }}
		/>
	</main>
)

export default AuthLayout
