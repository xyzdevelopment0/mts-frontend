'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useMemo } from 'react'
import { createInstanceRequest } from '@repo/api-client/endpoints/instances'
import { Button } from '@repo/ui/button'
import { Headline } from '@repo/ui/headline'
import { Stepper } from '@repo/ui/stepper'
import { useDashboard } from '@/features/dashboard'
import { FlavorSelect } from './components/flavor-select'
import { ImageSelect } from './components/image-select'
import { NameInput } from './components/name-input'
import { SshAccess } from './components/ssh-access'
import { CreateInstanceModelProvider, useCreateInstanceModel } from './store'

const CREATE_INSTANCE_STEPS = [
	{ id: 1 },
	{ id: 2 },
	{ id: 3 },
	{ id: 4 },
] as const

const CREATE_INSTANCE_ERROR_MESSAGE =
	'Не удалось создать сервис. Попробуйте снова.'

const CreateInstanceModelContent = () => {
	const router = useRouter()
	const { data } = useDashboard()
	const {
		step,
		name,
		flavorId,
		imageId,
		createdInstance,
		error,
		isPending,
		set,
		nextStep,
	} = useCreateInstanceModel()
	const activeImages = useMemo(
		() => data.images.filter(item => item.is_active),
		[data.images]
	)

	useEffect(() => {
		if (data.flavors.length === 0) {
			if (flavorId !== null) {
				set({ flavorId: null })
			}
			return
		}

		if (flavorId !== null && data.flavors.some(item => item.id === flavorId)) {
			return
		}

		set({ flavorId: data.flavors[0].id })
	}, [data.flavors, flavorId, set])

	useEffect(() => {
		if (activeImages.length === 0) {
			if (imageId !== null) {
				set({ imageId: null })
			}
			return
		}

		if (imageId !== null && activeImages.some(item => item.id === imageId)) {
			return
		}

		set({ imageId: activeImages[0].id })
	}, [activeImages, imageId, set])

	const stepContent =
		step === 1 ? (
			<NameInput value={name} onChange={value => set({ name: value })} />
		) : step === 2 ? (
			<FlavorSelect
				items={data.flavors}
				value={flavorId}
				onChange={value => set({ flavorId: value })}
			/>
		) : step === 3 ? (
			<ImageSelect
				items={activeImages}
				value={imageId}
				onChange={value => set({ imageId: value })}
			/>
		) : createdInstance ? (
			<SshAccess
				sshUser={createdInstance.ssh_user}
				sshPass={createdInstance.ssh_pass}
				sshHost={createdInstance.ssh_host}
				sshPort={createdInstance.ssh_port}
			/>
		) : null

	const stepTitle =
		step === 1
			? 'Создание сервиса'
			: step === 2
				? 'Выбор конфигурации'
				: step === 3
					? 'Выбор образа'
					: 'SSH доступ'
	const stepDescription =
		step === 1
			? 'Укажите имя будущего сервера.'
			: step === 2
				? 'Определите вычислительные ресурсы.'
				: step === 3
					? 'Определите базовую операционную систему.'
					: 'Скопируйте данные для подключения к серверу.'

	const isStepValid =
		step === 1
			? name.trim().length > 0
			: step === 2
				? data.flavors.length > 0 && flavorId !== null
				: step === 3
					? activeImages.length > 0 && imageId !== null
					: createdInstance !== null

	const submitLabel =
		step === 3
			? isPending
				? 'Создаем...'
				: 'Создать сервис'
			: step === 4
				? 'Открыть сервис'
				: 'Продолжить'

	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		if (!isStepValid || isPending) {
			return
		}

		set({ error: '' })

		if (step === 4) {
			if (!createdInstance) {
				return
			}

			router.push(`/instance/${createdInstance.instance_id}`)
			return
		}

		if (step !== 3) {
			nextStep()
			return
		}

		if (flavorId === null || imageId === null) {
			return
		}

		set({ isPending: true })

		try {
			const response = await createInstanceRequest({
				name: name.trim(),
				flavor_id: flavorId,
				image_id: imageId,
			})

			if (response.ok && response.data) {
				set({
					createdInstance: response.data,
					step: 4,
				})
				return
			}

			set({ error: CREATE_INSTANCE_ERROR_MESSAGE })
		} catch {
			set({ error: CREATE_INSTANCE_ERROR_MESSAGE })
		} finally {
			set({ isPending: false })
		}
	}

	return (
		<div className='col-center h-full w-full max-w-[22rem] gap-6'>
			<Stepper items={CREATE_INSTANCE_STEPS} activeId={step} />
			<form
				className='col h-full w-full flex-1 justify-between gap-5'
				onSubmit={onSubmit}
			>
				<div className='col gap-5'>
					<Headline title={stepTitle} description={stepDescription} />
					{stepContent}
				</div>
				<div className='col gap-2'>
					<Button
						className='w-full'
						type='submit'
						disabled={!isStepValid || isPending}
					>
						{submitLabel}
					</Button>
					{error ? (
						<p className='text-center text-sm text-red-500'>{error}</p>
					) : null}
				</div>
			</form>
		</div>
	)
}

export const CreateInstanceModel = () => (
	<CreateInstanceModelProvider>
		<CreateInstanceModelContent />
	</CreateInstanceModelProvider>
)
