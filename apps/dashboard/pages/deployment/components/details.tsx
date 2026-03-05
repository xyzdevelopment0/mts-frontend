'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { getDeploymentStatusRequest } from '@repo/api-client/endpoints/deployments'
import { Button } from '@repo/ui/button'
import { Headline } from '@repo/ui/headline'
import { type Deployment } from '@repo/types/deployment'
import { cn } from '@repo/utils/cn'
import { Label } from '@/pages/instance/components/label'
import {
	DEPLOYMENT_ATTEMPT_STATUS_COPY,
	TERMINAL_DEPLOYMENT_STATUSES,
	formatDateTime,
	getDeploymentProgress,
	getDeploymentSwaggerUrl,
	getDeploymentStatusLabel,
	getRandomDelayMs,
	getValidationMessage,
	isDeploymentResponse,
	truncate,
} from '@/features/deployments'
import { DeploymentMeta } from './meta'
import { DeploymentTitle } from './title'

const POLL_DEPLOYMENT_ERROR_MESSAGE =
	'Не удалось получить статус деплоя. Попробуйте снова.'

type DeploymentDetailsContentProps = {
	initialDeployment: Deployment
}

export const DeploymentDetailsContent = ({
	initialDeployment,
}: DeploymentDetailsContentProps) => {
	const [deployment, setDeployment] = useState(initialDeployment)
	const [error, setError] = useState('')
	const [isPolling, setIsPolling] = useState(
		!TERMINAL_DEPLOYMENT_STATUSES.has(initialDeployment.status)
	)

	const pollingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
	const progress = useMemo(
		() => getDeploymentProgress(deployment),
		[deployment]
	)
	const publicSwaggerUrl = deployment.public_url
		? getDeploymentSwaggerUrl(deployment.public_url)
		: null

	useEffect(() => {
		if (!isPolling) {
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
				const response = await getDeploymentStatusRequest(
					deployment.deployment_id
				)

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

				setError(
					getValidationMessage(response.data) ?? POLL_DEPLOYMENT_ERROR_MESSAGE
				)
				setIsPolling(false)
			} catch {
				if (cancelled) {
					return
				}

				setError(POLL_DEPLOYMENT_ERROR_MESSAGE)
				setIsPolling(false)
			}
		}

		void poll()

		return () => {
			cancelled = true
			clearPollingTimeout()
		}
	}, [deployment.deployment_id, isPolling])

	const attempts = [...deployment.attempts].sort(
		(a, b) => b.attempt - a.attempt
	)

	return (
		<main className='col flex-1 gap-6'>
			<section className='col-center gap-4'>
				<Headline
					title={<DeploymentTitle deployment={deployment} />}
					description={<DeploymentMeta deployment={deployment} />}
				/>
				<div className='row flex-wrap justify-center gap-3'>
					<Button
						type='button'
						variant='secondary'
						onClick={() =>
							window.open(
								deployment.github_url,
								'_blank',
								'noopener,noreferrer'
							)
						}
					>
						Открыть GitHub
					</Button>
					{publicSwaggerUrl ? (
						<Button
							type='button'
							onClick={() =>
								window.open(publicSwaggerUrl, '_blank', 'noopener,noreferrer')
							}
						>
							Открыть приложение
						</Button>
					) : null}
				</div>
				{error ? (
					<p className='text-amber-4 text-center text-sm'>{error}</p>
				) : null}
			</section>
			<section className='col gap-4'>
				<article className='col bg-bg-2 gap-2 rounded-2xl p-5'>
					<Label>Текущий статус</Label>
					<p
						className={cn(
							'text-fg-4 text-lg font-semibold',
							isPolling &&
								'animate-pulse bg-[linear-gradient(90deg,var(--color-fg-4),var(--color-purple-4),var(--color-fg-4))] bg-[length:200%_100%] bg-clip-text text-transparent'
						)}
					>
						{progress.title ?? getDeploymentStatusLabel(deployment.status)}
					</p>
					{progress.description ? (
						<p className='text-fg-2 text-sm'>{progress.description}</p>
					) : null}
					{progress.attemptText ? (
						<p className='text-fg-1 text-xs'>{progress.attemptText}</p>
					) : null}
					{progress.aiDetail ? (
						<p className='text-fg-3 text-xs'>{progress.aiDetail}</p>
					) : null}
				</article>
				<article className='col bg-bg-2 gap-3 rounded-2xl p-5'>
					<Label>Попытки</Label>
					{attempts.length === 0 ? (
						<p className='text-fg-2 text-sm'>Пока нет данных по попыткам.</p>
					) : (
						<div className='col gap-3'>
							{attempts.map(attempt => (
								<div
									key={attempt.attempt}
									className='col bg-bg-1 gap-2 rounded-xl p-4'
								>
									<div className='row-center justify-between gap-2'>
										<span className='text-fg-4 text-sm font-medium'>
											Попытка {attempt.attempt}
										</span>
										<span className='text-fg-2 text-sm'>{attempt.status}</span>
									</div>
									{attempt.technology ? (
										<p className='text-fg-2 text-sm'>
											Стек: {attempt.technology}
										</p>
									) : null}
									{DEPLOYMENT_ATTEMPT_STATUS_COPY[
										attempt.status as keyof typeof DEPLOYMENT_ATTEMPT_STATUS_COPY
									] ? (
										<p className='text-fg-2 text-sm'>
											{
												DEPLOYMENT_ATTEMPT_STATUS_COPY[
													attempt.status as keyof typeof DEPLOYMENT_ATTEMPT_STATUS_COPY
												]
											}
										</p>
									) : null}
									{attempt.build_error ? (
										<p className='text-amber-4 text-sm'>
											{truncate(attempt.build_error)}
										</p>
									) : null}
									<div className='row flex-wrap gap-3 text-xs'>
										{attempt.started_at ? (
											<span className='text-fg-1'>
												Старт: {formatDateTime(attempt.started_at)}
											</span>
										) : null}
										{attempt.finished_at ? (
											<span className='text-fg-1'>
												Финиш: {formatDateTime(attempt.finished_at)}
											</span>
										) : null}
									</div>
								</div>
							))}
						</div>
					)}
				</article>
			</section>
		</main>
	)
}
