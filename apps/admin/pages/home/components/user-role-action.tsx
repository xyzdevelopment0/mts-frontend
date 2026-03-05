'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {
	demoteAdminUserRequest,
	promoteAdminUserRequest,
} from '@repo/api-client/endpoints/admin'
import { Button } from '@repo/ui/button'
import { type AdminUserRole } from '@repo/types/admin'

type UserRoleActionProps = {
	userId: number
	role: AdminUserRole
}

const ACTION_BY_ROLE = {
	USER: {
		label: 'Повысить',
		request: promoteAdminUserRequest,
	},
	ADMIN: {
		label: 'Понизить',
		request: demoteAdminUserRequest,
	},
} as const

export const UserRoleAction = ({ userId, role }: UserRoleActionProps) => {
	const router = useRouter()
	const [isPending, setIsPending] = useState(false)
	const [error, setError] = useState('')
	const action = ACTION_BY_ROLE[role as keyof typeof ACTION_BY_ROLE]

	if (!action) {
		return <span className='text-fg-1 text-xs'>—</span>
	}

	return (
		<div className='col items-end gap-1'>
			<Button
				type='button'
				size='sm'
				variant='secondary'
				disabled={isPending}
				onClick={async () => {
					setError('')
					setIsPending(true)

					try {
						const response = await action.request(userId)
						if (!response.ok) {
							setError('Не удалось обновить роль')
							return
						}

						router.refresh()
					} catch {
						setError('Не удалось обновить роль')
					} finally {
						setIsPending(false)
					}
				}}
			>
				{isPending ? '...' : action.label}
			</Button>
			{error ? <span className='text-red-4 text-xs'>{error}</span> : null}
		</div>
	)
}
