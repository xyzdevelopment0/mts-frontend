'use client'

import { useDashboard } from '@/features/dashboard'
import { HomeEmptyState } from './components/empty-state'
import { Instances } from './components/instances'

export const Home = () => {
	const { data } = useDashboard()

	if (data.tenant.instances.length === 0) {
		return <HomeEmptyState />
	}

	return <Instances items={data.tenant.instances} images={data.images} />
}
