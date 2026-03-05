'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import {
	createDeploymentRequest,
	getDeploymentStatusRequest,
} from '@/api/endpoints/deployments'
import { Button } from '@/components/button'
import { EmptyState } from '@/components/empty-state'
import { Headline } from '@/components/headline'
import { Input } from '@/components/input'
import { InstancesEmptyIllustration } from '@/illustrations'
import {
	type CreateDeploymentResponse,
	type Deployment,
	type DeploymentAttempt,
	type DeploymentAttemptStatus,
	type DeploymentStatus,
	type ValidationErrorResponse,
} from '@/types/deployment'
import { cn } from '@/utils/cn'
import { DEPLOY_LOG_MESSAGES } from '../constants/deploy-logs'
import {
	DEPLOYMENT_ATTEMPT_STATUS_COPY,
	DEPLOYMENT_STATUS_COPY,
	TERMINAL_DEPLOYMENT_STATUSES,
} from '../constants/deploy-status'

type DeployEmptyStateProps = {
	tenantId: number
}

const CREATE_DEPLOYMENT_ERROR_MESSAGE =
	'Не удалось запустить авто-деплой. Попробуйте снова.'
const POLL_DEPLOYMENT_ERROR_MESSAGE =
	'Не удалось получить статус деплоя. Попробуйте снова.'

const shuffle = (items: string[]) => {
	const result = [...items]

	for (let index = result.length - 1; index > 0; index -= 1) {
		const randomIndex = Math.floor(Math.random() * (index + 1))
		;[result[index], result[randomIndex]] = [result[randomIndex], result[index]]
	}

	return result
}

const getRandomDelayMs = () => Math.floor(Math.random() * 2001) + 3000

const isObject = (value: unknown): value is Record<string, unknown> =>
	typeof value === 'object' && value !== null

const truncate = (value: string, maxLength = 180) =>
	value.length > maxLength ? `${value.slice(0, maxLength).trimEnd()}...` : value

const getValidationMessage = (value: unknown) => {
	if (!isObject(value) || !Array.isArray(value.detail)) {
		return null
	}

	const [first] = value.detail as ValidationErrorResponse['detail']
	if (!first || typeof first.msg !== 'string') {
		return null
	}

	const message = first.msg.trim()
	return message.length > 0 ? message : null
}

const isCreateDeploymentResponse = (
	value: unknown
): value is CreateDeploymentResponse =>
	isObject(value) &&
	typeof value.deployment_id === 'string' &&
	typeof value.status === 'string'

const isDeploymentResponse = (value: unknown): value is Deployment =>
	isObject(value) &&
	typeof value.deployment_id === 'string' &&
	typeof value.status === 'string' &&
	Array.isArray(value.attempts)

const getCleanText = (value: string | null | undefined) => {
	if (!value) {
		return null
	}

	const cleaned = value.trim()
	return cleaned.length > 0 ? cleaned : null
}

const getLatestAttempt = (attempts: DeploymentAttempt[]) =>
	attempts.reduce<DeploymentAttempt | null>(
		(latest, current) =>
			latest === null || current.attempt >= latest.attempt ? current : latest,
		null
	)

const getDeploymentCopy = (status: string) => {
	const copy = DEPLOYMENT_STATUS_COPY[status as DeploymentStatus]

	if (copy) {
		return copy
	}

	return {
		title: 'Деплой',
		description: 'Подготавливаю авто-деплой и проверяю конфигурацию.',
	}
}

const getAttemptDescription = (status: string | null | undefined) => {
	if (!status) {
		return null
	}

	return (
		DEPLOYMENT_ATTEMPT_STATUS_COPY[status as DeploymentAttemptStatus] ?? null
	)
}

const isValidPublicGithubUrl = (value: string) => {
	try {
		const url = new URL(value)
		if (url.protocol !== 'https:') {
			return false
		}

		const host = url.hostname.toLowerCase()
		if (host !== 'github.com' && host !== 'www.github.com') {
			return false
		}

		const path = url.pathname.replace(/\/+$/, '')
		const parts = path.split('/').filter(Boolean)
		if (parts.length !== 2) {
			return false
		}

		const [owner, rawRepo] = parts
		const repo = rawRepo.endsWith('.git') ? rawRepo.slice(0, -4) : rawRepo
		const partRegex = /^[A-Za-z0-9._-]+$/
		return partRegex.test(owner) && partRegex.test(repo)
	} catch {
		return false
	}
}

export const DeployEmptyState = ({ tenantId }: DeployEmptyStateProps) => {
	const [githubUrl, setGithubUrl] = useState('')
	const [inputError, setInputError] = useState('')
	const [requestError, setRequestError] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [deploymentId, setDeploymentId] = useState('')
	const [deployment, setDeployment] = useState<Deployment | null>(null)
	const [isPolling, setIsPolling] = useState(false)
	const [currentLog, setCurrentLog] = useState('')
	const [logQueue, setLogQueue] = useState<string[]>([])

	const pollingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
	const logTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

	const status = deployment?.status ?? ''
	const isTerminal = TERMINAL_DEPLOYMENT_STATUSES.has(status)
	const isLoading = isSubmitting || isPolling || (!!deployment && !isTerminal)
	const latestAttempt = useMemo(
		() => (deployment ? getLatestAttempt(deployment.attempts) : null),
		[deployment]
	)

	const progress = useMemo(() => {
		if (!deployment) {
			return {
				title: 'Автодеплой',
				description:
					'Подключите публичный репозиторий, и ИИ автоматически развернет сервис.',
				attemptText: 'До 3 попыток сборки',
				aiDetail: null as string | null,
			}
		}

		const statusCopy = getDeploymentCopy(deployment.status)
		const attemptDescription = getAttemptDescription(latestAttempt?.status)
		const technology = getCleanText(latestAttempt?.technology)
		const buildError = getCleanText(latestAttempt?.build_error)
		const deploymentError = getCleanText(deployment.error_message)

		let title = statusCopy.title
		let description = attemptDescription ?? statusCopy.description
		let aiDetail: string | null = null

		if (technology) {
			aiDetail = `Распознан стек: ${technology}.`
		}

		if (getCleanText(latestAttempt?.dockerfile)) {
			aiDetail = aiDetail
				? `${aiDetail} Dockerfile сгенерирован.`
				: 'Dockerfile сгенерирован для этой попытки.'
		}

		if (buildError) {
			title = 'Фикс'
			description = 'Исправляю ошибку сборки и готовлю следующую попытку.'
			aiDetail = truncate(buildError)
		}

		if (deployment.status === 'failed') {
			title = 'Ошибка'
			description = deploymentError
				? truncate(deploymentError)
				: 'Авто-деплой завершился ошибкой. Проверьте репозиторий и повторите запуск.'
		}

		if (deployment.status === 'deleted') {
			title = 'Удалено'
			description = 'Деплой удален и больше не доступен.'
		}

		if (deployment.status === 'running') {
			title = 'Готово'
			description = 'Сервис запущен и готов принимать трафик.'
		}

		const attemptNumber = Math.max(
			deployment.current_attempt,
			latestAttempt?.attempt ?? 0
		)
		const maxAttempts =
			deployment.max_attempts > 0 ? deployment.max_attempts : 3
		const attemptText =
			attemptNumber > 0 ? `Попытка ${attemptNumber} из ${maxAttempts}` : null

		return {
			title,
			description,
			attemptText,
			aiDetail,
		}
	}, [deployment, latestAttempt])

	useEffect(() => {
		if (!deploymentId || !isPolling) {
			return
		}

		let cancelled = false

		const clearPollingTimeout = () => {
			if (pollingTimeoutRef.current !== null) {
				clearTimeout(pollingTimeoutRef.current)
				pollingTimeoutRef.current = null
			}
		}

		const poll = async () => {
			try {
				const response = await getDeploymentStatusRequest(deploymentId)
				if (cancelled) {
					return
				}

				if (response.ok && isDeploymentResponse(response.data)) {
					setDeployment(response.data)

					if (TERMINAL_DEPLOYMENT_STATUSES.has(response.data.status)) {
						setIsPolling(false)
						return
					}

					pollingTimeoutRef.current = setTimeout(() => {
						void poll()
					}, getRandomDelayMs())
					return
				}

				setRequestError(
					getValidationMessage(response.data) ?? POLL_DEPLOYMENT_ERROR_MESSAGE
				)
				setIsPolling(false)
			} catch {
				if (cancelled) {
					return
				}

				setRequestError(POLL_DEPLOYMENT_ERROR_MESSAGE)
				setIsPolling(false)
			}
		}

		void poll()

		return () => {
			cancelled = true
			clearPollingTimeout()
		}
	}, [deploymentId, isPolling])

	useEffect(() => {
		if (!isLoading || logQueue.length === 0) {
			if (logTimeoutRef.current !== null) {
				clearTimeout(logTimeoutRef.current)
				logTimeoutRef.current = null
			}
			return
		}

		logTimeoutRef.current = setTimeout(() => {
			setLogQueue(previous => {
				if (previous.length === 0) {
					return previous
				}

				const [nextLog, ...rest] = previous
				setCurrentLog(nextLog)
				return rest
			})
		}, getRandomDelayMs())

		return () => {
			if (logTimeoutRef.current !== null) {
				clearTimeout(logTimeoutRef.current)
				logTimeoutRef.current = null
			}
		}
	}, [isLoading, logQueue])

	return (
		<EmptyState
			illustration={<InstancesEmptyIllustration className='max-w-[16rem]' />}
			title={
				<Headline
					title='У вас еще нет деплоя'
					description='Укажите публичный GitHub-репозиторий, и ИИ автоматически соберет и запустит сервис.'
				/>
			}
			description={
				<div className='col-center gap-1.5'>
					<p
						className={cn(
							'text-fg-4 text-lg font-semibold',
							isLoading &&
								'animate-pulse bg-[linear-gradient(90deg,var(--color-fg-4),var(--color-purple-4),var(--color-fg-4))] bg-[length:200%_100%] bg-clip-text text-transparent'
						)}
					>
						{progress.title}
					</p>
					<p className='text-fg-2 max-w-[21rem] text-sm'>
						{progress.description}
					</p>
					{progress.attemptText ? (
						<p className='text-fg-1 text-xs'>{progress.attemptText}</p>
					) : null}
					{progress.aiDetail ? (
						<p className='text-fg-3 max-w-[21rem] text-xs'>
							{progress.aiDetail}
						</p>
					) : null}
				</div>
			}
			action={
				<form
					className='col w-full gap-3'
					onSubmit={async event => {
						event.preventDefault()

						if (isLoading) {
							return
						}

						const normalizedUrl = githubUrl.trim()
						if (!isValidPublicGithubUrl(normalizedUrl)) {
							setInputError(
								'Введите корректный публичный URL GitHub-репозитория.'
							)
							return
						}

						setInputError('')
						setRequestError('')
						setDeploymentId('')
						setDeployment(null)
						setIsPolling(false)
						setIsSubmitting(true)

						const logs = shuffle([...DEPLOY_LOG_MESSAGES])
						setCurrentLog(logs[0] ?? '')
						setLogQueue(logs.slice(1))

						try {
							const response = await createDeploymentRequest({
								github_url: normalizedUrl,
								tenant_id: tenantId,
							})

							if (response.ok && isCreateDeploymentResponse(response.data)) {
								setDeploymentId(response.data.deployment_id)
								setIsPolling(true)
								return
							}

							setRequestError(
								getValidationMessage(response.data) ??
									CREATE_DEPLOYMENT_ERROR_MESSAGE
							)
						} catch {
							setRequestError(CREATE_DEPLOYMENT_ERROR_MESSAGE)
						} finally {
							setIsSubmitting(false)
						}
					}}
				>
					<div className='row gap-3'>
						<Input
							autoCapitalize='off'
							autoComplete='off'
							autoCorrect='off'
							className='h-11 flex-1'
							disabled={isLoading}
							placeholder='https://github.com/owner/repo'
							type='url'
							value={githubUrl}
							onChange={event => {
								setGithubUrl(event.target.value)
								if (inputError) {
									setInputError('')
								}
							}}
						/>
						<Button
							className='w-fit shrink-0 px-4'
							disabled={isLoading || githubUrl.trim().length === 0}
							type='submit'
						>
							{isLoading ? 'Деплоим...' : 'Автодеплой'}
						</Button>
					</div>
					{inputError ? (
						<p className='text-center text-sm text-red-500'>{inputError}</p>
					) : null}
					{requestError ? (
						<p className='text-center text-sm text-red-500'>{requestError}</p>
					) : null}
					{deployment?.status === 'running' && deployment.public_url ? (
						<Button
							className='w-fit self-center'
							type='button'
							variant='secondary'
							onClick={() =>
								window.open(
									deployment.public_url ?? '',
									'_blank',
									'noopener,noreferrer'
								)
							}
						>
							Открыть приложение
						</Button>
					) : null}
					{isLoading && currentLog ? (
						<p
							className={cn(
								'border-bg-3 text-fg-2 rounded-xl border px-3 py-2 text-left text-xs',
								'font-mono leading-5'
							)}
						>
							{currentLog}
						</p>
					) : null}
				</form>
			}
		/>
	)
}
