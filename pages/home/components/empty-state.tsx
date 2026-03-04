'use client'

import { useState } from 'react'
import { Button } from '@/components/button'
import { EmptyState } from '@/components/empty-state'
import { Headline } from '@/components/headline'
import { Modal, ModalMain } from '@/components/modal'
import { CreateInstanceModel } from '@/features/create-instance-model'
import { InstancesEmptyIllustration } from '@/illustrations'
import { Add01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

export const HomeEmptyState = () => {
	const [open, setOpen] = useState(false)
	const icon = <HugeiconsIcon icon={Add01Icon} size={14} strokeWidth={2.25} />

	return (
		<>
			<EmptyState
				illustration={<InstancesEmptyIllustration />}
				title={
					<Headline
						title={<span className='text-2xl font-semibold'>Главная</span>}
						description='У вас пока нет сервисов. Создайте первый сервис, чтобы начать работу.'
					/>
				}
				description={null}
				action={
					<Button
						className='min-w-[12rem]'
						type='button'
						icon={icon}
						onClick={() => setOpen(true)}
					>
						Создать сервис
					</Button>
				}
			/>
			<Modal open={open} onOpenChange={setOpen}>
				<ModalMain className='items-center gap-0 px-6 pb-6'>
					<CreateInstanceModel onSuccess={() => setOpen(false)} />
				</ModalMain>
			</Modal>
		</>
	)
}
