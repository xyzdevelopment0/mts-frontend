'use client'

import { usePathname } from 'next/navigation'

export const useItemActive = (href: string) => {
	const pathname = usePathname() ?? ''

	return href === '/' ? pathname === '/' : pathname.startsWith(href)
}
