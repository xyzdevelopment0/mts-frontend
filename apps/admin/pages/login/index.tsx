import { Login as SharedLogin } from '@repo/auth/login'

const dashboardOrigin = (
	process.env.NEXT_PUBLIC_DASHBOARD_ORIGIN ??
	process.env.NEXT_PUBLIC_APP_ORIGIN ??
	''
).replace(/\/$/, '')
const successHref = dashboardOrigin ? `${dashboardOrigin}/home` : '/home'

export const Login = () => <SharedLogin successHref={successHref} />
