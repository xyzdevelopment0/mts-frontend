import { REGISTER_STEPS } from './constants/steps'
import { RegisterProvider, useRegister } from './store'

const RegisterContent = () => {
	const { step } = useRegister()
	const activeStep =
		REGISTER_STEPS.find(item => item.id === step) ?? REGISTER_STEPS[0]
	const Step = activeStep.Component

	return (
		<main className='bg-bg-1 min-h-dvh md:grid md:grid-cols-2'>
			<section className='col-center min-h-dvh justify-center px-6 py-10'>
				<Step />
			</section>
			<section className='bg-bg-2 hidden md:block' />
		</main>
	)
}

export const Register = () => (
	<RegisterProvider>
		<RegisterContent />
	</RegisterProvider>
)
