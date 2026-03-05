import { Login as SharedLogin } from '@repo/auth/login'

const adminOrigin = (process.env.NEXT_PUBLIC_ADMIN_ORIGIN ?? '').replace(
	/\/$/,
	''
)
const adminHomeHref = adminOrigin ? `${adminOrigin}/home` : undefined

export const Login = () => (
	<SharedLogin successHref='/home' superuserSuccessHref={adminHomeHref} />
)
