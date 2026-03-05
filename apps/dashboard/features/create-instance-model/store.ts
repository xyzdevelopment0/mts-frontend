import { createStore } from 'zustand/vanilla'
import { createContextStore } from '@repo/utils/create-store'

type CreateInstanceStep = 1 | 2 | 3 | 4

export interface CreatedInstanceCredentials {
	instanceId: number
	sshUsername: string
	sshHost: string
	sshPort: number
	sshPassword: string
}

interface State {
	step: CreateInstanceStep
	name: string
	flavorId: number | null
	imageId: number | null
	createdInstance: CreatedInstanceCredentials | null
	error: string
	isPending: boolean
}

interface Actions {
	set: (state: Partial<State>) => void
	nextStep: () => void
}

type Props = Record<string, unknown>

type CreateInstanceModelStore = Record<string, unknown> & State & Actions

const createCreateInstanceModelStore = () =>
	createStore<CreateInstanceModelStore>(set => ({
		step: 1,
		name: '',
		flavorId: null,
		imageId: null,
		createdInstance: null,
		error: '',
		isPending: false,
		set: state => set({ ...state }),
		nextStep: () =>
			set(state => ({
				step: state.step === 4 ? 4 : ((state.step + 1) as CreateInstanceStep),
			})),
	}))

export const { CreateInstanceModelProvider, useCreateInstanceModel } =
	createContextStore<'createInstanceModel', CreateInstanceModelStore, Props>(
		'createInstanceModel',
		() => createCreateInstanceModelStore()
	)
