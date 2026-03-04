'use client'

import { useState } from 'react'
import { Button } from '@/components/button'
import { EmptyState } from '@/components/empty-state'
import { Headline } from '@/components/headline'
import { Modal, ModalMain } from '@/components/modal'
import { CreateInstanceModel } from '@/features/create-instance-model'
import { InstancesEmptyIllustration } from '@/illustrations'

export const HomeEmptyState = () => {
	const [open, setOpen] = useState(false)

	return (
		<>
			<EmptyState
				illustration={<InstancesEmptyIllustration />}
				title={
					<Headline
						title={<span className='text-2xl font-semibold'>Главная</span>}
						description='У вас пока нет инстансов. Создайте первый сервер, чтобы начать работу.'
					/>
				}
				description={null}
				action={
					<Button
						className='min-w-[12rem]'
						type='button'
						onClick={() => setOpen(true)}
					>
						Создать инстанс
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
