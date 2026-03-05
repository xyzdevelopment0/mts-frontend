import {
	type CreateDeploymentResponse,
	type Deployment,
	type DeploymentAttempt,
	type DeploymentAttemptStatus,
	type DeploymentDashRead,
	type DeploymentStatus,
	type ValidationErrorResponse,
} from '@repo/types/deployment'
import {
	DEPLOYMENT_ATTEMPT_STATUS_COPY,
	DEPLOYMENT_STATUS_COPY,
	DEPLOYMENT_STATUS_DOT_COLORS,
	DEPLOYMENT_STATUS_LABELS,
} from './constants'

const GITHUB_REPOSITORY_PATH_REGEX =
	/^\/[A-Za-z0-9._-]+\/[A-Za-z0-9._-]+(?:\.git)?\/?$/

const isObject = (value: unknown): value is Record<string, unknown> =>
	typeof value === 'object' && value !== null

export const getRandomDelayMs = () => Math.floor(Math.random() * 2001) + 3000

export const shuffle = (items: string[]) => {
	const result = [...items]

	for (let index = result.length - 1; index > 0; index -= 1) {
		const randomIndex = Math.floor(Math.random() * (index + 1))
		;[result[index], result[randomIndex]] = [result[randomIndex], result[index]]
	}

	return result
}

export const truncate = (value: string, maxLength = 180) =>
	value.length > maxLength ? `${value.slice(0, maxLength).trimEnd()}...` : value

export const getValidationMessage = (value: unknown) => {
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

export const isCreateDeploymentResponse = (
	value: unknown
): value is CreateDeploymentResponse =>
	isObject(value) &&
	typeof value.deployment_id === 'string' &&
	typeof value.status === 'string'

export const isDeploymentResponse = (value: unknown): value is Deployment =>
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

export const getLatestAttempt = (attempts: DeploymentAttempt[]) =>
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
		DEPLOYMENT_ATTEMPT_STATUS_COPY[status as DeploymentAttemptStatus] ?? status
	)
}

export const getDeploymentProgress = (deployment: Deployment | null) => {
	if (!deployment) {
		return {
			title: null,
			description: null,
			attemptText: null,
			aiDetail: null,
		}
	}

	const latestAttempt = getLatestAttempt(deployment.attempts)
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
	const maxAttempts = deployment.max_attempts > 0 ? deployment.max_attempts : 5
	const attemptText =
		attemptNumber > 0 ? `Попытка ${attemptNumber} из ${maxAttempts}` : null

	return {
		title,
		description,
		attemptText,
		aiDetail,
	}
}

export const isValidPublicGithubUrl = (value: string) => {
	try {
		const url = new URL(value)
		if (url.protocol !== 'https:') {
			return false
		}

		const host = url.hostname.toLowerCase()
		if (host !== 'github.com' && host !== 'www.github.com') {
			return false
		}

		return (
			url.username.length === 0 &&
			url.password.length === 0 &&
			url.port.length === 0 &&
			url.search.length === 0 &&
			url.hash.length === 0 &&
			GITHUB_REPOSITORY_PATH_REGEX.test(url.pathname)
		)
	} catch {
		return false
	}
}

export const getDeploymentSwaggerUrl = (value: string) => {
	const trimmed = value.trim()
	if (!trimmed) {
		return ''
	}

	try {
		const url = new URL(trimmed)
		const pathname = url.pathname.replace(/\/+$/, '')
		url.pathname = pathname.endsWith('/swagger')
			? pathname
			: `${pathname}/swagger`
		return url.toString()
	} catch {
		const normalized = trimmed.replace(/\/+$/, '')
		return normalized.endsWith('/swagger')
			? normalized
			: `${normalized}/swagger`
	}
}

export const toDeploymentDashRead = (
	deployment: Deployment
): DeploymentDashRead => ({
	deployment_id: deployment.deployment_id,
	github_url: deployment.github_url,
	status: deployment.status,
	public_url: deployment.public_url,
	error_message: deployment.error_message,
	created_at: deployment.created_at,
	updated_at: deployment.updated_at,
})

export const getDeploymentRepositoryLabel = (githubUrl: string) => {
	try {
		const url = new URL(githubUrl)
		const path = url.pathname.replace(/^\/+/, '').replace(/\/+$/, '')
		if (!path) {
			return githubUrl
		}

		return `/${path.replace(/\.git$/, '')}`
	} catch {
		return githubUrl
	}
}

export const getDeploymentStatusLabel = (status: string) =>
	DEPLOYMENT_STATUS_LABELS[status as DeploymentStatus] ?? 'В работе'

export const getDeploymentStatusDotColor = (status: string) =>
	DEPLOYMENT_STATUS_DOT_COLORS[status as DeploymentStatus] ?? 'bg-amber-4'

export const formatRelativeShortTime = (value: string) => {
	const timestamp = Date.parse(value)
	if (Number.isNaN(timestamp)) {
		return '--'
	}

	const diffSeconds = Math.max(Math.floor((Date.now() - timestamp) / 1000), 0)

	if (diffSeconds < 60) {
		return `${diffSeconds}s`
	}

	const diffMinutes = Math.floor(diffSeconds / 60)
	if (diffMinutes < 60) {
		return `${diffMinutes}m`
	}

	const diffHours = Math.floor(diffMinutes / 60)
	if (diffHours < 24) {
		return `${diffHours}h`
	}

	const diffDays = Math.floor(diffHours / 24)
	return `${diffDays}d`
}

export const formatDateTime = (value: string) => {
	const date = new Date(value)
	if (Number.isNaN(date.getTime())) {
		return '--'
	}

	return new Intl.DateTimeFormat('ru-RU', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	}).format(date)
}
