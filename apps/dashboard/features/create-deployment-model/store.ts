import { createStore } from 'zustand/vanilla'
import { createContextStore } from '@repo/utils/create-store'

interface State {
	githubUrl: string
	inputError: string
	error: string
	isSubmitting: boolean
}

interface Actions {
	set: (state: Partial<State>) => void
}

type Props = Record<string, unknown>

type CreateDeploymentModelStore = Record<string, unknown> & State & Actions

const createCreateDeploymentModelStore = () =>
	createStore<CreateDeploymentModelStore>(set => ({
		githubUrl: '',
		inputError: '',
		error: '',
		isSubmitting: false,
		set: state => set({ ...state }),
	}))

export const { CreateDeploymentModelProvider, useCreateDeploymentModel } =
	createContextStore<
		'createDeploymentModel',
		CreateDeploymentModelStore,
		Props
	>('createDeploymentModel', () => createCreateDeploymentModelStore())
