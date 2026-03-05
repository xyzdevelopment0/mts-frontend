'use client'

import { createStore } from 'zustand/vanilla'
import { type Dashboard } from '@repo/types/dashboard'
import { createContextStore } from '@repo/utils/create-store'

interface State {
	data: Dashboard
}

interface Actions {
	setData: (data: Dashboard) => void
}

type Props = Record<string, unknown> & { data: Dashboard }

type DashboardStore = Record<string, unknown> & State & Actions

const createDashboardStore = (props: Props) =>
	createStore<DashboardStore>(set => ({
		data: props.data,
		setData: data => set({ data }),
	}))

export const { DashboardProvider, useDashboard } = createContextStore<
	'dashboard',
	DashboardStore,
	Props
>('dashboard', createDashboardStore)
