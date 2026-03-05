'use client'

import { createStore } from 'zustand/vanilla'
import { type Dashboard } from '@repo/types/dashboard'
import { type DeploymentDashRead } from '@repo/types/deployment'
import { type Instance } from '@repo/types/instance'
import { createContextStore } from '@repo/utils/create-store'

interface State {
	data: Dashboard
}

interface Actions {
	setData: (data: Dashboard) => void
	addInstance: (instance: Instance) => void
	addDeployment: (deployment: DeploymentDashRead) => void
	updateDeployment: (deployment: DeploymentDashRead) => void
}

type Props = Record<string, unknown> & { data: Dashboard }

type DashboardStore = Record<string, unknown> & State & Actions

const createDashboardStore = (props: Props) =>
	createStore<DashboardStore>(set => ({
		data: props.data,
		setData: data => set({ data }),
		addInstance: instance =>
			set(state => {
				const nextInstances = state.data.tenant.instances.some(
					item => item.id === instance.id
				)
					? state.data.tenant.instances.map(item =>
							item.id === instance.id ? instance : item
						)
					: [instance, ...state.data.tenant.instances]

				return {
					data: {
						...state.data,
						tenant: {
							...state.data.tenant,
							instances: nextInstances,
						},
					},
				}
			}),
		addDeployment: deployment =>
			set(state => {
				const nextDeployments = state.data.deployments.some(
					item => item.deployment_id === deployment.deployment_id
				)
					? state.data.deployments.map(item =>
							item.deployment_id === deployment.deployment_id
								? deployment
								: item
						)
					: [deployment, ...state.data.deployments]

				return {
					data: {
						...state.data,
						deployments: nextDeployments,
					},
				}
			}),
		updateDeployment: deployment =>
			set(state => ({
				data: {
					...state.data,
					deployments: state.data.deployments.map(item =>
						item.deployment_id === deployment.deployment_id ? deployment : item
					),
				},
			})),
	}))

export const { DashboardProvider, useDashboard } = createContextStore<
	'dashboard',
	DashboardStore,
	Props
>('dashboard', createDashboardStore)
