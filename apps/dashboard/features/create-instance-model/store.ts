import { createStore } from 'zustand/vanilla'
import { createContextStore } from '@repo/utils/create-store'

type CreateInstanceStep = 1 | 2 | 3

interface State {
	step: CreateInstanceStep
	name: string
	flavorId: number | null
	imageId: number | null
	error: string
	isPending: boolean
}

interface Actions {
	set: (
		state: Partial<
			Pick<State, 'name' | 'flavorId' | 'imageId' | 'error' | 'isPending'>
		>
	) => void
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
		error: '',
		isPending: false,
		set: state => set({ ...state }),
		nextStep: () =>
			set(state => ({
				step: state.step === 3 ? 3 : ((state.step + 1) as CreateInstanceStep),
			})),
	}))

export const { CreateInstanceModelProvider, useCreateInstanceModel } =
	createContextStore<'createInstanceModel', CreateInstanceModelStore, Props>(
		'createInstanceModel',
		() => createCreateInstanceModelStore()
	)
