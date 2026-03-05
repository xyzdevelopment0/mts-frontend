'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import {
	deleteAdminInstanceRequest,
	performAdminInstanceActionRequest,
} from '@repo/api-client/endpoints/admin'
import { Button } from '@repo/ui/button'
import { cn } from '@repo/utils/cn'
import { type AdminInstanceStatus } from '@repo/types/admin'

type InstanceRowActionsProps = {
	instanceId: number
	status: AdminInstanceStatus
}

const ACTIONS_BY_STATUS: Record<AdminInstanceStatus, string[]> = {
	PROVISIONING: ['restart'],
	RUNNING: ['stop', 'restart'],
	STOPPED: ['start'],
	ERROR: ['start', 'restart'],
	TERMINATED: ['start'],
}

const selectClassName = cn(
	'h-8 rounded-lg px-2 text-xs',
	'bg-bg-1 text-fg-4 border border-transparent',
	'focus:ring-purple-2 focus:ring-2 focus:outline-none'
)

export const InstanceRowActions = ({
	instanceId,
	status,
}: InstanceRowActionsProps) => {
	const router = useRouter()
	const options = useMemo(
		() => ACTIONS_BY_STATUS[status] ?? ['restart'],
		[status]
	)
	const [selectedAction, setSelectedAction] = useState(options[0] ?? 'restart')
	const [isActionPending, setIsActionPending] = useState(false)
	const [isDeletePending, setIsDeletePending] = useState(false)
	const [error, setError] = useState('')

	useEffect(() => {
		if (options.includes(selectedAction)) {
			return
		}

		setSelectedAction(options[0] ?? 'restart')
	}, [options, selectedAction])

	return (
		<div className='col items-end gap-1'>
			<div className='row-center gap-2'>
				<select
					value={selectedAction}
					onChange={event => setSelectedAction(event.target.value)}
					className={selectClassName}
					disabled={isActionPending || isDeletePending}
				>
					{options.map(action => (
						<option key={action} value={action}>
							{action}
						</option>
					))}
				</select>
				<Button
					type='button'
					size='sm'
					className='h-8 px-3 text-xs'
					disabled={isActionPending || isDeletePending}
					onClick={async () => {
						setError('')
						setIsActionPending(true)

						try {
							const response = await performAdminInstanceActionRequest(
								instanceId,
								{
									action: selectedAction,
								}
							)
							if (!response.ok) {
								setError('Не удалось выполнить действие')
								return
							}

							router.refresh()
						} catch {
							setError('Не удалось выполнить действие')
						} finally {
							setIsActionPending(false)
						}
					}}
				>
					{isActionPending ? '...' : 'Выполнить'}
				</Button>
				<Button
					type='button'
					size='sm'
					variant='secondary'
					className='h-8 px-3 text-xs'
					disabled={isActionPending || isDeletePending}
					onClick={async () => {
						if (!window.confirm('Удалить инстанс?')) {
							return
						}

						setError('')
						setIsDeletePending(true)

						try {
							const response = await deleteAdminInstanceRequest(instanceId)
							if (!response.ok) {
								setError('Не удалось удалить инстанс')
								return
							}

							router.refresh()
						} catch {
							setError('Не удалось удалить инстанс')
						} finally {
							setIsDeletePending(false)
						}
					}}
				>
					{isDeletePending ? '...' : 'Удалить'}
				</Button>
			</div>
			{error ? <span className='text-red-4 text-xs'>{error}</span> : null}
		</div>
	)
}
