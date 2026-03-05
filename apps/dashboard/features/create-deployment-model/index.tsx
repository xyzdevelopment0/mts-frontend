'use client'

import { useRouter } from 'next/navigation'
import { createDeploymentRequest } from '@repo/api-client/endpoints/deployments'
import { Button } from '@repo/ui/button'
import { Headline } from '@repo/ui/headline'
import { Input } from '@repo/ui/input'
import { useDashboard } from '@/features/dashboard'
import {
	getValidationMessage,
	isCreateDeploymentResponse,
	isValidPublicGithubUrl,
} from '@/features/deployments'
import {
	CreateDeploymentModelProvider,
	useCreateDeploymentModel,
} from './store'

const CREATE_DEPLOYMENT_ERROR_MESSAGE =
	'Не удалось запустить авто-деплой. Попробуйте снова.'

type CreateDeploymentModelProps = {
	onCreated?: (deploymentId: string) => void
	onClose?: () => void
}

const CreateDeploymentModelContent = ({
	onCreated,
	onClose,
}: CreateDeploymentModelProps) => {
	const router = useRouter()
	const { data } = useDashboard()
	const { githubUrl, inputError, error, isSubmitting, set } =
		useCreateDeploymentModel()
	const normalizedGithubUrl = githubUrl.trim()
	const isGithubUrlValid = isValidPublicGithubUrl(normalizedGithubUrl)
	const tenantId = data.tenant.id
	const isTenantIdValid = typeof tenantId === 'number' && tenantId > 0

	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		if (isSubmitting) {
			return
		}

		if (!isGithubUrlValid) {
			set({
				inputError: 'Введите корректный публичный URL GitHub-репозитория.',
			})
			return
		}

		set({
			inputError: '',
			error: '',
			isSubmitting: true,
		})

		try {
			const response = await createDeploymentRequest({
				github_url: normalizedGithubUrl,
				tenant_id: tenantId,
			})

			if (response.ok && isCreateDeploymentResponse(response.data)) {
				if (onCreated) {
					onCreated(response.data.deployment_id)
					return
				}

				router.push(`/deployment/${response.data.deployment_id}`)
				return
			}

			set({
				error:
					getValidationMessage(response.data) ??
					CREATE_DEPLOYMENT_ERROR_MESSAGE,
			})
		} catch {
			set({ error: CREATE_DEPLOYMENT_ERROR_MESSAGE })
		} finally {
			set({ isSubmitting: false })
		}
	}

	return (
		<div className='col-center h-full w-full max-w-[22rem] gap-6'>
			<form
				className='col h-full w-full flex-1 justify-between gap-5'
				onSubmit={onSubmit}
			>
				<div className='col gap-5'>
					<Headline
						title='Автодеплой'
						description='Укажите публичный GitHub-репозиторий, и ИИ автоматически запустит деплой.'
					/>
					<div className='col gap-2'>
						<span className='text-fg-4 text-sm font-medium'>GitHub URL</span>
						<Input
							autoCapitalize='off'
							autoComplete='off'
							autoCorrect='off'
							autoFocus
							placeholder='https://github.com/owner/repo'
							type='url'
							value={githubUrl}
							onChange={event => {
								set({
									githubUrl: event.target.value,
									inputError: '',
								})
							}}
						/>
					</div>
				</div>
				<div className='col gap-2'>
					<Button
						className='w-full'
						type='submit'
						disabled={!isGithubUrlValid || !isTenantIdValid || isSubmitting}
					>
						{isSubmitting ? 'Запускаем...' : 'Запустить деплой'}
					</Button>
					{inputError ? (
						<p className='text-center text-sm text-red-500'>{inputError}</p>
					) : null}
					{error ? (
						<p className='text-center text-sm text-red-500'>{error}</p>
					) : null}
					{onClose ? (
						<Button
							className='w-full'
							type='button'
							variant='secondary'
							onClick={onClose}
						>
							Закрыть
						</Button>
					) : null}
				</div>
			</form>
		</div>
	)
}

export const CreateDeploymentModel = (props: CreateDeploymentModelProps) => (
	<CreateDeploymentModelProvider>
		<CreateDeploymentModelContent {...props} />
	</CreateDeploymentModelProvider>
)
