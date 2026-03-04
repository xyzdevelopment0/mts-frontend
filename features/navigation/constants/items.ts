import { Home01Icon, Settings01Icon } from '@hugeicons/core-free-icons'

export const NAVIGATION_ITEMS = [
	{
		href: '/',
		icon: Home01Icon,
	},
	{
		href: '/settings',
		icon: Settings01Icon,
	},
] as const

export type NavigationItem = (typeof NAVIGATION_ITEMS)[number]
