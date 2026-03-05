const getResponseRole = (data: unknown) => {
	if (typeof data !== 'object' || data === null) {
		return ''
	}

	const { role } = data as { role?: unknown }
	return typeof role === 'string' ? role : ''
}

const isAbsoluteHref = (href: string) =>
	href.startsWith('http://') || href.startsWith('https://')

const isLocalHost = (hostname: string) =>
	hostname === 'localhost' || hostname === '127.0.0.1'

const isIpAddress = (hostname: string) => /^[0-9.]+$/.test(hostname)

const getRootDomain = (hostname: string) => {
	const parts = hostname.split('.').filter(Boolean)
	if (parts.length <= 2) {
		return hostname
	}

	return parts.slice(-2).join('.')
}

const resolveFallbackSuperuserHref = () => {
	if (typeof window === 'undefined') {
		return ''
	}

	const { protocol, hostname } = window.location

	if (isLocalHost(hostname)) {
		return `${protocol}//localhost:3001/home`
	}

	if (isIpAddress(hostname)) {
		return ''
	}

	const rootDomain = getRootDomain(hostname)
	if (!rootDomain) {
		return ''
	}

	return `${protocol}//admin.${rootDomain}/home`
}

export const navigateTo = (href: string, push: (href: string) => void) => {
	if (isAbsoluteHref(href)) {
		window.location.assign(href)
		return
	}

	push(href)
}

interface ResolveSuccessHrefOptions {
	data: unknown
	successHref: string
	superuserSuccessHref?: string
}

export const resolveSuccessHref = ({
	data,
	successHref,
	superuserSuccessHref,
}: ResolveSuccessHrefOptions) => {
	const role = getResponseRole(data)
	if (role === 'SUPERUSER') {
		if (superuserSuccessHref) {
			return superuserSuccessHref
		}

		const fallbackSuperuserHref = resolveFallbackSuperuserHref()
		if (fallbackSuperuserHref) {
			return fallbackSuperuserHref
		}
	}

	return successHref
}
