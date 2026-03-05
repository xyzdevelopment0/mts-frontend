import { redirect } from 'next/navigation'

const dashboardOrigin = (
	process.env.NEXT_PUBLIC_DASHBOARD_ORIGIN ??
	process.env.NEXT_PUBLIC_APP_ORIGIN ??
	'http://localhost:3000'
).replace(/\/$/, '')

const RegisterPage = () => redirect(`${dashboardOrigin}/register`)

export default RegisterPage
