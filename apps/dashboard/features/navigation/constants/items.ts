import {
	CoinsDollarIcon,
	Home01Icon,
	Settings01Icon,
} from '@hugeicons/core-free-icons'

export const NAVIGATION_ITEMS = [
	{
		href: '/home',
		icon: Home01Icon,
	},
	{
		href: '/cost',
		icon: CoinsDollarIcon,
	},
	{
		href: '/settings',
		icon: Settings01Icon,
	},
] as const

export type NavigationItem = {
	href: (typeof NAVIGATION_ITEMS)[number]['href']
	icon: (typeof NAVIGATION_ITEMS)[number]['icon']
	label?: string
}
