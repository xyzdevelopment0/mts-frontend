'use client'

import { REGISTER_STEPS } from './constants/steps'
import { RegisterProvider, useRegister } from './store'

const RegisterContent = () => {
	const { step } = useRegister()
	const activeStep =
		REGISTER_STEPS.find(item => item.id === step) ?? REGISTER_STEPS[0]
	const Step = activeStep.Component

	return (
		<main className='bg-bg-1 min-h-dvh md:grid md:grid-cols-2'>
			<section className='col-center min-h-dvh px-6 py-10 md:justify-center'>
				<Step />
			</section>
			<section
				className='hidden bg-cover bg-center bg-no-repeat md:block'
				style={{
					backgroundImage: "url('https://i.ibb.co/B2C4JM1n/image.png')",
				}}
			/>
		</main>
	)
}

export const Register = () => (
	<RegisterProvider>
		<RegisterContent />
	</RegisterProvider>
)
