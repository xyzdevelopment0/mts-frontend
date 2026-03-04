'use client'

import { Avatar } from '@/components/avatar'
import { useDashboard } from '@/features/dashboard'

const getFirstLetter = (value: string) => value.trim().charAt(0).toUpperCase()

export const HeaderUser = () => {
	const { data } = useDashboard()
	const letter =
		getFirstLetter(data.user.name) || getFirstLetter(data.user.email) || 'U'

	return <Avatar letter={letter} />
}
