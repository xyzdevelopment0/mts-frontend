'use client'

import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import {
	Add01Icon,
	ArchiveArrowUpIcon,
	ServerStack03Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Button } from '@repo/ui/button'
import { Modal, ModalMain } from '@repo/ui/modal'
import { cn } from '@repo/utils/cn'
import { CreateDeploymentModel } from '@/features/create-deployment-model'
import { CreateInstanceModel } from '@/features/create-instance-model'

const OVERLAY_TRANSITION = {
	type: 'spring' as const,
	duration: 0.3,
	bounce: 0,
}

type CreateResourcePickerProps = {
	open: boolean
	onOpenChange: (value: boolean) => void
	onSelectDeployment: () => void
	onSelectInstance: () => void
}

const CreateResourcePicker = ({
	open,
	onOpenChange,
	onSelectDeployment,
	onSelectInstance,
}: CreateResourcePickerProps) => {
	useEffect(() => {
		if (!open) {
			return
		}

		const previousOverflow = document.body.style.overflow
		document.body.style.overflow = 'hidden'

		return () => {
			document.body.style.overflow = previousOverflow
		}
	}, [open])

	useEffect(() => {
		if (!open) {
			return
		}

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key !== 'Escape') {
				return
			}

			event.preventDefault()
			onOpenChange(false)
		}

		document.addEventListener('keydown', handleKeyDown)
		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [onOpenChange, open])

	if (typeof window === 'undefined') {
		return null
	}

	return createPortal(
		<AnimatePresence>
			{open ? (
				<div className='fixed inset-0 z-[60] flex items-center justify-center'>
					<motion.div
						aria-hidden='true'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={OVERLAY_TRANSITION}
						className='bg-bg-a4/70 fixed inset-0 backdrop-blur-[1px]'
						onMouseDown={() => onOpenChange(false)}
					/>
					<motion.div
						role='dialog'
						aria-modal='true'
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.95 }}
						transition={OVERLAY_TRANSITION}
						className='relative z-10 w-full'
						onMouseDown={event => event.stopPropagation()}
					>
						<div className='row flex-wrap justify-center gap-4 px-4 sm:px-6'>
							<button
								type='button'
								className={cn(
									'col relative h-56 w-full cursor-pointer justify-between rounded-2xl p-6 text-left',
									'transition-all select-none active:scale-99 data-[pressed]:scale-99',
									'bg-purple-4 hover:bg-purple-3 text-white shadow-md',
									'lg:max-w-[280px]',
									'focus-visible:ring-purple-2 focus-visible:ring-2 focus-visible:outline-none'
								)}
								onClick={() => {
									onOpenChange(false)
									onSelectDeployment()
								}}
							>
								<div className='center size-10 rounded-full bg-white/20'>
									<HugeiconsIcon
										icon={ArchiveArrowUpIcon}
										size={20}
										strokeWidth={2}
									/>
								</div>
								<div className='col gap-1'>
									<span className='text-lg font-medium'>Автодеплой</span>
									<p className='text-sm text-white/90'>
										Подключите GitHub-репозиторий, и система автоматически
										развернет приложение.
									</p>
								</div>
							</button>
							<button
								type='button'
								className={cn(
									'col relative h-56 w-full cursor-pointer justify-between rounded-2xl p-6 text-left',
									'transition-all select-none active:scale-99 data-[pressed]:scale-99',
									'bg-background hover:bg-bg-1 shadow-md',
									'lg:max-w-[280px]',
									'focus-visible:ring-purple-2 focus-visible:ring-2 focus-visible:outline-none'
								)}
								onClick={() => {
									onOpenChange(false)
									onSelectInstance()
								}}
							>
								<div className='center bg-bg-2 size-10 rounded-full'>
									<HugeiconsIcon
										icon={ServerStack03Icon}
										size={20}
										strokeWidth={2}
									/>
								</div>
								<div className='col gap-1'>
									<span className='text-fg-4 text-lg font-medium'>
										Создать с нуля
									</span>
									<p className='text-fg-2 text-sm'>
										Создайте новый сервер с нужной конфигурацией и образом.
									</p>
								</div>
							</button>
						</div>
					</motion.div>
				</div>
			) : null}
		</AnimatePresence>,
		document.body
	)
}

type CreateResourceButtonProps = {
	variant?: 'header' | 'home'
}

export const CreateResourceButton = ({
	variant = 'header',
}: CreateResourceButtonProps) => {
	const router = useRouter()
	const [pickerOpen, setPickerOpen] = useState(false)
	const [instanceOpen, setInstanceOpen] = useState(false)
	const [deploymentOpen, setDeploymentOpen] = useState(false)
	const icon = <HugeiconsIcon icon={Add01Icon} size={14} strokeWidth={2.25} />

	return (
		<>
			{variant === 'header' ? (
				<>
					<Button
						size='sm'
						type='button'
						className='md:hidden'
						icon={icon}
						aria-label='Создать'
						onClick={() => setPickerOpen(true)}
					/>
					<Button
						size='sm'
						type='button'
						className='hidden md:flex'
						icon={icon}
						onClick={() => setPickerOpen(true)}
					>
						Создать
					</Button>
				</>
			) : (
				<Button
					className='min-w-[12rem]'
					type='button'
					icon={icon}
					onClick={() => setPickerOpen(true)}
				>
					Создать
				</Button>
			)}
			<CreateResourcePicker
				open={pickerOpen}
				onOpenChange={setPickerOpen}
				onSelectDeployment={() => setDeploymentOpen(true)}
				onSelectInstance={() => setInstanceOpen(true)}
			/>
			<Modal open={deploymentOpen} onOpenChange={setDeploymentOpen}>
				<ModalMain className='items-center gap-0 px-6 pb-6'>
					<CreateDeploymentModel
						onClose={() => setDeploymentOpen(false)}
						onCreated={deploymentId => {
							setDeploymentOpen(false)
							router.push(`/deployment/${deploymentId}`)
						}}
					/>
				</ModalMain>
			</Modal>
			<Modal open={instanceOpen} onOpenChange={setInstanceOpen}>
				<ModalMain className='items-center gap-0 px-6 pb-6'>
					<CreateInstanceModel
						onCreated={instanceId => {
							setInstanceOpen(false)
							router.push(`/instance/${instanceId}`)
						}}
					/>
				</ModalMain>
			</Modal>
		</>
	)
}
