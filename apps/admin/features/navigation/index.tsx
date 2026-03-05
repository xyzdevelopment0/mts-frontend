'use client'

import { NavigationContainer, NavigationItemView } from '@repo/shell'
import { NAVIGATION_ITEMS } from './constants/items'

export const Navigation = () => (
	<NavigationContainer>
		{NAVIGATION_ITEMS.map(item => (
			<NavigationItemView key={item.href} {...item} />
		))}
	</NavigationContainer>
)
