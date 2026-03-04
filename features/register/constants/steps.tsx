import { RegisterStep1 } from '../steps/1'
import { RegisterStep2 } from '../steps/2'
import { RegisterStep3 } from '../steps/3'

export const REGISTER_STEPS = [
	{
		id: 1,
		Component: RegisterStep1,
	},
	{
		id: 2,
		Component: RegisterStep2,
	},
	{
		id: 3,
		Component: RegisterStep3,
	},
] as const
