import { redirect } from 'next/navigation'
import { getDashboardUserQuery } from '@/api/queries/dashboard'
import { DashboardProvider } from '@/features/dashboard'
import { Header } from '@/features/header'
import { Navigation } from '@/features/navigation'

type LayoutProps = Readonly<{
	children: React.ReactNode
}>

const DashboardLayout = async ({ children }: LayoutProps) => {
	const response = await getDashboardUserQuery()

	if (!response.ok || !response.data) {
		redirect('/login')
	}

	return (
		<DashboardProvider data={response.data}>
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
