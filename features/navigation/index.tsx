'use client'

import { useDashboard } from '@/features/dashboard'
import { NavigationContainer } from './components/container'
import { NavigationItemView } from './components/item'
import { NAVIGATION_ITEMS } from './constants/items'

export const Navigation = () => {
	const { data } = useDashboard()
	const homeLabel = String(data.tenant.instances.length)

	return (
		<NavigationContainer>
			{NAVIGATION_ITEMS.map(item => (
				<NavigationItemView
					key={item.href}
					{...item}
					label={item.href === '/home' ? homeLabel : undefined}
				/>
			))}
		</NavigationContainer>
	)
}
