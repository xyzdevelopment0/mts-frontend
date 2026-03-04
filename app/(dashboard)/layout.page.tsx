import { Header } from '@/features/header'
import { Navigation } from '@/features/navigation'

type LayoutProps = Readonly<{
	children: React.ReactNode
}>

const DashboardLayout = ({ children }: LayoutProps) => (
	<>
		<Header />
		<div className='bg-bg-1 min-h-dvh pb-24'>
			<div className='col mx-auto min-h-dvh w-full max-w-[800px] px-6 pt-[calc(env(safe-area-inset-top)+5rem)] pb-10'>
				{children}
			</div>
		</div>
		<Navigation />
	</>
)

export default DashboardLayout
