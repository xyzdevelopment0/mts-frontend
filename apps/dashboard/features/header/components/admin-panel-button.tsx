'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@repo/ui/button'
import { useDashboard } from '@/features/dashboard'

const adminOrigin = (process.env.NEXT_PUBLIC_ADMIN_ORIGIN ?? '').replace(
	/\/$/,
	''
)
const adminHomeHref = adminOrigin ? `${adminOrigin}/home` : '/home'

const isAbsoluteHref = (href: string) =>
	href.startsWith('http://') || href.startsWith('https://')

export const HeaderAdminPanelButton = () => {
	const router = useRouter()
	const { data } = useDashboard()

	if (!data.user.is_admin) {
		return null
	}

	return (
		<>
			<Button
				size='sm'
				variant='secondary'
				type='button'
				className='md:hidden'
				onClick={() => {
					if (isAbsoluteHref(adminHomeHref)) {
						window.location.assign(adminHomeHref)
						return
					}

					router.push(adminHomeHref)
				}}
			>
				Админ
			</Button>
			<Button
				size='sm'
				variant='secondary'
				type='button'
				className='hidden md:flex'
				onClick={() => {
					if (isAbsoluteHref(adminHomeHref)) {
						window.location.assign(adminHomeHref)
						return
					}

					router.push(adminHomeHref)
				}}
			>
				Админ-панель
			</Button>
		</>
	)
}
