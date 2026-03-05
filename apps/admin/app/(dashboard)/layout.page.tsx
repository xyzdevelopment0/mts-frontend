import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ACCESS_TOKEN_COOKIE_NAME } from '@repo/api-client/constants/cookie-names'
import { getDashboardUserQuery } from '@repo/api-client/queries/dashboard'
import { type Dashboard } from '@repo/types/dashboard'
import { DashboardProvider } from '@/features/dashboard'
import { Header } from '@/features/header'
import { Navigation } from '@/features/navigation'

type LayoutProps = Readonly<{
	children: React.ReactNode
}>

interface AccessTokenPayload {
	role?: unknown
	email?: unknown
	name?: unknown
	exp?: unknown
}

const decodeAccessTokenPayload = (token: string): AccessTokenPayload | null => {
	const payload = token.split('.')[1]
	if (!payload) {
		return null
	}

	try {
		const normalized = payload.replace(/-/g, '+').replace(/_/g, '/')
		const padded = normalized + '='.repeat((4 - (normalized.length % 4)) % 4)
		const parsed = JSON.parse(Buffer.from(padded, 'base64').toString('utf8'))
		if (typeof parsed !== 'object' || parsed === null) {
			return null
		}

		return parsed as AccessTokenPayload
	} catch {
		return null
	}
}

const getPayloadRole = (payload: AccessTokenPayload | null) =>
	typeof payload?.role === 'string' ? payload.role : ''

const isPayloadExpired = (payload: AccessTokenPayload | null) =>
	typeof payload?.exp === 'number' && payload.exp * 1000 <= Date.now()

const getString = (value: unknown, fallback: string) =>
	typeof value === 'string' && value.trim() ? value : fallback

const createSuperuserData = (
	payload: AccessTokenPayload | null
): Dashboard => ({
	user: {
		email: getString(payload?.email, 'superuser@admin.local'),
		name: getString(payload?.name, 'Superuser'),
		is_admin: true,
	},
	tenant: {
		id: 0,
		name: 'Admin',
		balance: 0,
		plan: {
			id: 0,
			name: 'Admin',
			max_cpu: 0,
			max_ram_mb: 0,
		},
		instances: [],
		deployments: [],
	},
	images: [],
	flavors: [],
})

const DashboardLayout = async ({ children }: LayoutProps) => {
	const accessToken =
		(await cookies()).get(ACCESS_TOKEN_COOKIE_NAME)?.value ?? ''
	const payload = accessToken ? decodeAccessTokenPayload(accessToken) : null
	const isSuperuser =
		getPayloadRole(payload) === 'SUPERUSER' && !isPayloadExpired(payload)
	const response = await getDashboardUserQuery()
	let data: Dashboard

	if (isSuperuser && (!response.ok || !response.data)) {
		data = createSuperuserData(payload)
		return (
			<DashboardProvider data={data}>
				<Header />
				<div className='bg-bg-1 min-h-dvh pb-24'>
					<div className='col mx-auto mt-10 min-h-dvh w-full max-w-[800px] px-6 pt-[calc(env(safe-area-inset-top)+5rem)] pb-10'>
						{children}
					</div>
				</div>
				<Navigation />
			</DashboardProvider>
		)
	}

	if (!response.ok || !response.data) {
		redirect('/login')
	}

	if (!response.data.user.is_admin && !isSuperuser) {
		redirect('/login')
	}

	data = {
		...response.data,
		user: {
			...response.data.user,
			is_admin: response.data.user.is_admin || isSuperuser,
		},
		tenant: {
			...response.data.tenant,
			deployments: response.data.tenant.deployments ?? [],
		},
		images: response.data.images ?? [],
		flavors: response.data.flavors ?? [],
	}

	return (
		<DashboardProvider data={data}>
			<Header />
			<div className='bg-bg-1 min-h-dvh pb-24'>
				<div className='col mx-auto mt-10 min-h-dvh w-full max-w-[800px] px-6 pt-[calc(env(safe-area-inset-top)+5rem)] pb-10'>
					{children}
				</div>
			</div>
			<Navigation />
		</DashboardProvider>
	)
}

export default DashboardLayout
