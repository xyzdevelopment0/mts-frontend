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
import { CreateInstanceModelProvider, useCreateInstanceModel } from './store'

const CREATE_INSTANCE_STEPS = [{ id: 1 }, { id: 2 }, { id: 3 }] as const

const CREATE_INSTANCE_ERROR_MESSAGE =
	'Не удалось создать сервис. Попробуйте снова.'

interface Props {
	onSuccess?: () => void
}

const CreateInstanceModelContent = ({ onSuccess }: Props) => {
	const router = useRouter()
	const { data } = useDashboard()
	const { step, name, flavorId, imageId, error, isPending, set, nextStep } =
		useCreateInstanceModel()
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
		) : (
			<ImageSelect
				items={activeImages}
				value={imageId}
				onChange={value => set({ imageId: value })}
			/>
		)

	const stepTitle =
		step === 1
			? 'Создание сервиса'
			: step === 2
				? 'Выбор конфигурации'
				: 'Выбор образа'
	const stepDescription =
		step === 1
			? 'Укажите имя будущего сервера.'
			: step === 2
				? 'Определите вычислительные ресурсы.'
				: 'Определите базовую операционную систему.'

	const isStepValid =
		step === 1
			? name.trim().length > 0
			: step === 2
				? data.flavors.length > 0 && flavorId !== null
				: activeImages.length > 0 && imageId !== null

	return (
		<div className='col-center h-full w-full max-w-[22rem] gap-6'>
			<Stepper items={CREATE_INSTANCE_STEPS} activeId={step} />
			<form
				className='col h-full w-full flex-1 justify-between gap-5'
				onSubmit={async event => {
					event.preventDefault()

					if (!isStepValid || isPending) {
						return
					}

					set({ error: '' })

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
							router.push(`/instance/${response.data.instance_id}`)
							onSuccess?.()
							return
						}

						set({ error: CREATE_INSTANCE_ERROR_MESSAGE })
					} catch {
						set({ error: CREATE_INSTANCE_ERROR_MESSAGE })
					} finally {
						set({ isPending: false })
					}
				}}
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
						{step === 3
							? isPending
								? 'Создаем...'
								: 'Создать сервис'
							: 'Продолжить'}
					</Button>
					{error ? (
						<p className='text-center text-sm text-red-500'>{error}</p>
					) : null}
				</div>
			</form>
		</div>
	)
}

export const CreateInstanceModel = ({ onSuccess }: Props) => (
	<CreateInstanceModelProvider>
		<CreateInstanceModelContent onSuccess={onSuccess} />
	</CreateInstanceModelProvider>
)
