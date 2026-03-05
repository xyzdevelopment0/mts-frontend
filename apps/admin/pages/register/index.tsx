import { Register as SharedRegister } from '@repo/auth/register'

const dashboardOrigin = (
	process.env.NEXT_PUBLIC_DASHBOARD_ORIGIN ??
	process.env.NEXT_PUBLIC_APP_ORIGIN ??
	''
).replace(/\/$/, '')
const successHref = dashboardOrigin ? `${dashboardOrigin}/home` : '/home'

export const Register = () => <SharedRegister successHref={successHref} />
