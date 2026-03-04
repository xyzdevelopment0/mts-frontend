import { Home01Icon, Settings01Icon } from '@hugeicons/core-free-icons'

export const NAVIGATION_ITEMS = [
	{
		href: '/',
		icon: Home01Icon,
		label: '0',
	},
	{
		href: '/settings',
		icon: Settings01Icon,
		label: undefined,
	},
] as const

export type NavigationItem = (typeof NAVIGATION_ITEMS)[number]
