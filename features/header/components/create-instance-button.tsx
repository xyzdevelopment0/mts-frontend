'use client'

import { useState } from 'react'
import { Button } from '@/components/button'
import { Modal, ModalMain } from '@/components/modal'
import { CreateInstanceModel } from '@/features/create-instance-model'
import { Add01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

export const HeaderCreateInstanceButton = () => {
	const [open, setOpen] = useState(false)
	const icon = <HugeiconsIcon icon={Add01Icon} size={14} strokeWidth={2.25} />

	return (
		<>
			<Button
				size='sm'
				type='button'
				className='md:hidden'
				icon={icon}
				aria-label='Создать сервис'
				onClick={() => setOpen(true)}
			/>
			<Button
				size='sm'
				type='button'
				className='hidden md:flex'
				icon={icon}
				onClick={() => setOpen(true)}
			>
				Создать сервис
			</Button>
			<Modal open={open} onOpenChange={setOpen}>
				<ModalMain className='items-center gap-0 px-6 pb-6'>
					<CreateInstanceModel onSuccess={() => setOpen(false)} />
				</ModalMain>
			</Modal>
		</>
	)
}
