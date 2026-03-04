import { createStore } from 'zustand/vanilla'
import { createContextStore } from '@/utils/create-store'

type RegisterStep = 1 | 2 | 3

interface State {
	step: RegisterStep
	email: string
	password: string
	name: string
	tenantName: string
}

interface Actions {
	set: (
		state: Partial<Pick<State, 'email' | 'password' | 'name' | 'tenantName'>>
	) => void
	nextStep: () => void
}

type Props = Record<string, unknown>
type RegisterStore = Record<string, unknown> & State & Actions

const createRegisterStore = () =>
	createStore<RegisterStore>(set => ({
		step: 1,
		email: '',
		password: '',
		name: '',
		tenantName: '',
		set: state => set({ ...state }),
		nextStep: () =>
			set(state => ({
				step: state.step === 3 ? 3 : ((state.step + 1) as RegisterStep),
			})),
	}))

export const { RegisterProvider, useRegister } = createContextStore<
	'register',
	RegisterStore,
	Props
>('register', () => createRegisterStore())
