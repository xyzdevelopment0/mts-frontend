'use client'

import { Stepper } from '@repo/ui/stepper'
import { REGISTER_STEPS } from './constants/steps'
import { RegisterProvider, useRegister } from './store'

const RegisterContent = () => {
	const { step } = useRegister()
	const activeStep =
		REGISTER_STEPS.find(item => item.id === step) ?? REGISTER_STEPS[0]
	const Step = activeStep.Component

	return (
		<div className='col-center w-full max-w-[22rem] gap-8'>
			<Stepper items={REGISTER_STEPS} activeId={step} />
			<Step />
		</div>
	)
}

export const Register = () => (
	<RegisterProvider>
		<RegisterContent />
	</RegisterProvider>
)
