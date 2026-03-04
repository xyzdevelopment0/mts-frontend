'use client'

import { REGISTER_STEPS } from './constants/steps'
import { RegisterProvider, useRegister } from './store'

const RegisterContent = () => {
	const { step } = useRegister()
	const activeStep =
		REGISTER_STEPS.find(item => item.id === step) ?? REGISTER_STEPS[0]
	const Step = activeStep.Component

	return <Step />
}

export const Register = () => (
	<RegisterProvider>
		<RegisterContent />
	</RegisterProvider>
)
