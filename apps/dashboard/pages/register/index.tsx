import { Register as SharedRegister } from '@repo/auth/register'

const adminOrigin = (process.env.NEXT_PUBLIC_ADMIN_ORIGIN ?? '').replace(
	/\/$/,
	''
)
const adminHomeHref = adminOrigin ? `${adminOrigin}/home` : undefined

export const Register = () => (
	<SharedRegister successHref='/home' superuserSuccessHref={adminHomeHref} />
)
