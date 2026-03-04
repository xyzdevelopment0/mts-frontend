import { createStore } from 'zustand/vanilla'
import { createContextStore } from '@/utils/create-store'

interface State {
	email: string
	password: string
}

interface Actions {
	set: (state: Partial<State>) => void
}

type Props = Record<string, unknown>
type LoginStore = Record<string, unknown> & State & Actions

const createLoginStore = () =>
	createStore<LoginStore>(set => ({
		email: '',
		password: '',
		set: state => set({ ...state }),
	}))

export const { LoginProvider, useLogin } = createContextStore<
	'login',
	LoginStore,
	Props
>('login', () => createLoginStore())
