'use client'

import { LoginProvider } from './store'
import { LoginStep1 } from './steps/1'

const LoginContent = () => <LoginStep1 />

export const Login = () => (
	<LoginProvider>
		<LoginContent />
	</LoginProvider>
)
