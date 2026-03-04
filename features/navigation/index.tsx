'use client'

import { NavigationContainer } from './components/container'
import { NavigationItemView } from './components/item'
import { NAVIGATION_ITEMS } from './constants/items'

export const Navigation = () => (
	<NavigationContainer>
		{NAVIGATION_ITEMS.map(item => (
			<NavigationItemView key={item.href} {...item} />
		))}
	</NavigationContainer>
)
