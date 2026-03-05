import {
	ADMIN_INSTANCE_STATUSES,
	ADMIN_USER_ROLES,
	type AdminInstanceStatus,
	type AdminUserRole,
} from '@repo/types/admin'

export type HomeSearchParams = Record<string, string | string[] | undefined>

export interface HomeFilters {
	tenantId: string
	userRole: '' | AdminUserRole
	instanceStatus: '' | AdminInstanceStatus
	deploymentStatus: string
}

const INTEGER_FORMATTER = new Intl.NumberFormat('ru-RU')
const CREDITS_FORMATTER = new Intl.NumberFormat('ru-RU', {
	maximumFractionDigits: 2,
})
const DATETIME_FORMATTER = new Intl.DateTimeFormat('ru-RU', {
	year: 'numeric',
	month: '2-digit',
	day: '2-digit',
	hour: '2-digit',
	minute: '2-digit',
})

const firstValue = (value: string | string[] | undefined) =>
	Array.isArray(value) ? (value[0] ?? '') : (value ?? '')

const normalize = (value: string) => value.trim()

const toRole = (value: string): '' | AdminUserRole =>
	ADMIN_USER_ROLES.includes(value as AdminUserRole)
		? (value as AdminUserRole)
		: ''

const toInstanceStatus = (value: string): '' | AdminInstanceStatus =>
	ADMIN_INSTANCE_STATUSES.includes(value as AdminInstanceStatus)
		? (value as AdminInstanceStatus)
		: ''

export const resolveHomeFilters = (
	searchParams: HomeSearchParams
): HomeFilters => {
	const tenantId = normalize(firstValue(searchParams.tenant_id))
	const userRole = toRole(
		normalize(firstValue(searchParams.user_role)).toUpperCase()
	)
	const instanceStatus = toInstanceStatus(
		normalize(firstValue(searchParams.instance_status)).toUpperCase()
	)
	const deploymentStatus = normalize(firstValue(searchParams.deployment_status))

	return {
		tenantId,
		userRole,
		instanceStatus,
		deploymentStatus,
	}
}

export const toOptionalPositiveInteger = (value: string) => {
	if (!/^\d+$/.test(value)) {
		return undefined
	}

	const parsed = Number(value)
	if (!Number.isSafeInteger(parsed) || parsed < 1) {
		return undefined
	}

	return parsed
}

export const formatInteger = (value: number) => INTEGER_FORMATTER.format(value)

export const formatCredits = (value: number) =>
	`${CREDITS_FORMATTER.format(value)} кр.`

export const formatDateTime = (value: string | null) => {
	if (!value) {
		return '—'
	}

	const date = new Date(value)
	if (Number.isNaN(date.getTime())) {
		return value
	}

	return DATETIME_FORMATTER.format(date)
}

const capitalize = (value: string) => {
	const trimmed = value.trim()
	if (!trimmed) {
		return ''
	}

	return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase()
}

export const formatStatusLabel = (value: string) =>
	capitalize(value.replace(/[_-]+/g, ' ')) || 'Неизвестно'

export const USER_ROLE_LABELS: Record<AdminUserRole, string> = {
	SUPERUSER: 'Суперпользователь',
	ADMIN: 'Администратор',
	USER: 'Пользователь',
}

export const ADMIN_USER_ROLE_FILTERS = ADMIN_USER_ROLES

export const ADMIN_INSTANCE_STATUS_FILTERS = ADMIN_INSTANCE_STATUSES

export const getGitHubRepositoryLabel = (url: string) => {
	try {
		const parsedUrl = new URL(url)
		const path = parsedUrl.pathname.replace(/\.git$/i, '').replace(/\/$/, '')
		const parts = path.split('/').filter(Boolean)
		if (parts.length >= 2) {
			return `${parts[parts.length - 2]}/${parts[parts.length - 1]}`
		}
	} catch {
		return url
	}

	return url
}

export const getDeploymentStatusTone = (status: string) => {
	const normalized = status.trim().toLowerCase()
	if (
		normalized.includes('running') ||
		normalized.includes('ready') ||
		normalized.includes('success')
	) {
		return 'bg-green-4'
	}

	if (normalized.includes('failed') || normalized.includes('error')) {
		return 'bg-red-4'
	}

	if (normalized.includes('delete') || normalized.includes('terminated')) {
		return 'bg-fg-1'
	}

	if (
		normalized.includes('building') ||
		normalized.includes('retry') ||
		normalized.includes('clone') ||
		normalized.includes('analy')
	) {
		return 'bg-amber-4'
	}

	return 'bg-purple-4'
}
